App.issue = App.cable.subscriptions.create({channel: "IssueChannel"}, {
  connected: function() {
    console.log('connected to IssueChannel')
  },

  disconnected: function() {
    console.log('disconnected from IssueChannel')
  },

  received: function(data) {
    var sender = data['sentBy']
    var barId = 'bar-' + sender;
    var $bar = $('#' + barId);
    if ($bar.length == 0) {
      $bar = $('<div/>', {id: barId})
      $bar.addClass('bar');
      $bar.text(sender);
      $('#graph').append($bar).append('<br/>');
    }
    $bar.width(data['width'])
  }
});
