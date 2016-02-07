$( document ).ready(function() {

  $('#subscribeBtn').click(function(e) {
    e.preventDefault();

    var email = $('#emailInput').val();

    $.post("/api/subscribers", { email: email })
    .done(function(data, textStatus, jqXHR) {
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

});
