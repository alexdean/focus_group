class Issue
  REDIS_KEY = 'issue'

  attr_accessor :q, :min, :max

  def self.fetch
    options = RedisInstance.get(REDIS_KEY)
    options = JSON.parse(options) if options
    new(options)
  end

  def initialize(options = nil)
    if options
      self.q = options['q']
      self.min = options['min']
      self.max = options['max']
    end
  end

  def save
    RedisInstance.set(
      REDIS_KEY,
      JSON.dump(q: q, min: min, max: max)
    )
  end
end
