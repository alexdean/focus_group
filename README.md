# FocusGroup

An experiment with ActionCable.

```
$ redis-server
$ bin/rails server
```

then open a few browsers and go to http://localhost:3000.


```ruby
# to send a message from a rails console
ActionCable.server.broadcast(IssueChannel::STREAM_NAME, 'hi from the console')
ActionCable.server.broadcast(IssueChannel::STREAM_NAME, {message: 'hi from the console'})
```

```javascript
// send a message from a JS console
App.issue.send({message: 'string message'})
```

messages sent from JS must be objects. String messages are not delivered.
`[NoMethodError - undefined method `except' for "string message":String]`
