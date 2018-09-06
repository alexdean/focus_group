class IssueChannel < ApplicationCable::Channel
  STREAM_NAME = 'issue'
  STATE_KEY = 'state'
  LAST_BROADCAST_KEY = 'last_broadcast'
  TIMEOUT_THRESHOLD = 15.seconds

  periodically every: 30.seconds do
    last_broadcast_at = RedisInstance.get(LAST_BROADCAST_KEY)
    if last_broadcast_at.nil? || (Time.current.to_i - 10 <= last_broadcast_at.to_i)
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
    ActionCable.server.broadcast(STREAM_NAME, pruned_state)
    RedisInstance.set(LAST_BROADCAST_KEY, Time.current.to_i)
  end

  # return current state of all clients, after removing stale reports
  def pruned_state
    now = Time.current.to_i

    out = []
    RedisInstance.hgetall(STATE_KEY).each do |uuid, raw|
      data = JSON.parse(raw)
      if TIMEOUT_THRESHOLD.ago.to_i <= data['last']
        out << {uuid: uuid, name: data['name'], value: data['value']}
      else
        RedisInstance.hdel(STATE_KEY, uuid)
      end
    end
    out
  end
end
