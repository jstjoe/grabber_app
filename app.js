(function() {
  return {
    events: {
      'app.created':'grab'
    },
    requests: {
      'updateTicket': function(assignee) {
        return {
          url: '/api/v2/tickets/' + this.ticket().id(),
          type: 'PUT',
          dataType: 'JSON',
          contentType: 'application/JSON',
          data: JSON.stringify({"ticket":
            {
              "assignee_id": assignee
            }
          })
        };
      }
    },
    grab: function() {
      if(this.ticket().postSaveAction() == 'next_play_ticket') {
        console.log("Play enabled");
        var me = this.currentUser().id(),
            ticket = this.ticket().id();
        if(this.setting('force')) {
          // assign with AJAX
          this.ajax('updateTicket', me)
          .done(function(response) {
            console.log(response);
          });
        } else {
          // set assignee on current ticket
          this.ticket().assignee({'userId': me});
        }
      }
    }
  };

}());
