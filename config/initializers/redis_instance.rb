config = YAML.load(File.read(Rails.root.join('config/cable.yml')))
RedisInstance = Redis.new(url: config[Rails.env]['url'])
