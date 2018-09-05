App.issue = App.cable.subscriptions.create({channel: "IssueChannel"}, {
  connected: function() {
    console.log('connected to IssueChannel')
  },

  disconnected: function() {
    console.log('disconnected from IssueChannel')
  },

  received: function(data) {
    console.log(data)
  }
});
