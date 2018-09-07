// App.issue = App.cable.subscriptions.create({channel: "IssueChannel"}, {
//   connected: function() {
//     console.log('connected to IssueChannel')
//   },
//
//   disconnected: function() {
//     console.log('disconnected from IssueChannel')
//   },
//
//   received: function(data) {
//     var seen_uuids = [];
//
//     data.forEach(function(item) {
//       var uuid = item['uuid']
//       seen_uuids.push(uuid);
//
//       var barId = 'bar-' + uuid;
//       var $bar = $('#' + barId);
//       if ($bar.length == 0) {
//         $bar = $('<div/>', {id: barId})
//         $bar.addClass('bar');
//         $bar.data('uuid', uuid);
//         $('#graph').append($bar).append('<br/>');
//       }
//       $bar.width(item['value']);
//       $bar.text(item['name']);
//     })
//
//     // delete any bars which weren't seen. (been pruned.)
//     $('.bar').filter(function(index) {
//       $elem = $(this)
//       if (seen_uuids.indexOf($elem.data('uuid')) == -1) {
//         $elem.remove();
//       }
//     })
//   },
// });
