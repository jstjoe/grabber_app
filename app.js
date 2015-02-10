(function() {
  return {
    events: {
      'app.created':'grab',
      'updateTicket.fail':'fail'
    },
    requests: {
      'updateTicket': function(assignee) {
        return {
          url: '/api/v2/tickets/' + this.ticket().id(),
          type: 'PUT',
          dataType: 'JSON',
          contentType: 'application/JSON',
          data: JSON.stringify({'ticket':{ 'assignee_id': assignee }})
        };
      }
    },
    grab: function() {
      var action = this.ticket().postSaveAction(),
          assignee = this.ticket().assignee();
          // debugger;
      if(action == 'next_play_ticket' && !assignee.user()) {
        // console.log('Grabbing!');
        var me = this.currentUser().id(),
            ticket = this.ticket().id();
        if(this.setting('force')) {
          // assign with AJAX
          this.ajax('updateTicket', me).done(function(response) {
            // console.dir(response);
          });
        } else {
          // assign with JS
          this.ticket().assignee({'userId': me});
        }
      } else {
        // console.log('conditions failed');
      }
    },
    fail: function(response) {
      services.notify('Could not assign this ticket to you.', 'error');
    }
  };
}());