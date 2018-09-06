class User
  attr_reader :uuid, :name, :value

  def self.from_uuid(uuid)
    raw = RedisInstance.hget(IssueChannel::STATE_KEY, uuid)
    user_data = raw ? JSON.parse(raw) : {}
    new(uuid: uuid, name: user_data['name'], value: user_data['value'])
  end

  def initialize(uuid:, name:, value:)
    @uuid = uuid
    @name = name
    @value = value
  end
end
