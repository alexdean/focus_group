class IssueChannel < ApplicationCable::Channel
  include ActionView::Helpers::SanitizeHelper

  STREAM_NAME = 'issue'
  STATE_KEY = 'state'
  LAST_BROADCAST_KEY = 'last_broadcast'
  TIMEOUT_THRESHOLD = 10.seconds

  # if there are periods of inactivity, trigger a broadcast to prune inactive clients.
  periodically every: 1.second do
    if broadcast_needed?
      broadcast_current_state
    end
  end

  def subscribed
    stream_from STREAM_NAME
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(incoming)
    # add incoming data to core struct
    # prune any clients who haven't reported in the last 30s
    # broadcast full state.
    now = Time.current.to_i
    current_state = incoming.dup
    uuid = current_state.delete('uuid')
    current_state['last'] = now

    RedisInstance.hset(STATE_KEY, uuid, JSON.dump(current_state))
    broadcast_current_state
  end

  def broadcast_current_state
    message = Issue
              .fetch
              .as_json
              .each_with_object({}) { |(k,v), acc| acc[k] = sanitize(v) }
    message['responses'] = pruned_clients
    ActionCable.server.broadcast(STREAM_NAME, message)
    RedisInstance.set(LAST_BROADCAST_KEY, Time.current.to_i)
  end

  # return current state of all clients, after removing stale reports
  def pruned_clients
    now = Time.current.to_i

    out = []
    RedisInstance.hgetall(STATE_KEY).each do |uuid, raw|
      data = JSON.parse(raw)
      if stale?(data['last'])
        RedisInstance.hdel(STATE_KEY, uuid)
      else
        out << {
          uuid: sanitize(uuid),
          name: sanitize(data['name']),
          value: data['value'].to_f
        }
      end
    end
    out
  end

  def stale?(timestamp)
    timestamp.to_i < TIMEOUT_THRESHOLD.ago.to_i
  end

  def broadcast_needed?
    last_broadcast_at = RedisInstance.get(LAST_BROADCAST_KEY)
    last_broadcast_at.nil? || stale?(last_broadcast_at)
  end
end
