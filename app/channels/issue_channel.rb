class IssueChannel < ApplicationCable::Channel
  STREAM_NAME = 'issue'

  def subscribed
    stream_from STREAM_NAME
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast(STREAM_NAME, data)
  end
end
