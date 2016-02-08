$( document ).ready(function() {

  $('#subscribeBtn').click(function(e) {
    e.preventDefault();

    var email = $('#emailInput').val();

    $.post("/api/subscribers", { email: email })
    .done(function(data) {
      sweetAlert({
        title: "You're good to go!",
        text: "You should receive your first email tomorrow.<br>Unless tomorrow is the weekend...<br>weekends are for brunch, not emails.",
        type: "success",
        html: true
      });
    })
    .fail(function(error) {
      var errorMessage = $.parseJSON(error.responseText).message;
      sweetAlert({
        title: "Oh no!",
        text: errorMessage,
        type: "warning"
      });
    });

  });

  $('#unsubscribeBtn').click(function(e) {
    e.preventDefault();

    var id = $('#unsubscribeBtn').data('id');

    $.ajax({
      url: "/api/subscribers?id=" + id,
      type: "DELETE"
    })
    .done(function(data) {
      sweetAlert({
        title: "Sorry to see you go...",
        text: "You shouldn't receive any more emails from us, but we will miss you!",
        type: "success",
        html: true
      });
    })
    .fail(function(error) {
      var errorMessage = $.parseJSON(error.responseText).message;
      sweetAlert({
        title: "Oh no!",
        text: "Something went wrong.<br>Please reach out via email so we can get this fixed ASAP!<br><a href='mailto://support@sparkthecause.com'>support@sparkthecause.com</a>",
        type: "warning",
        html: true
      });
    });

  });



});
