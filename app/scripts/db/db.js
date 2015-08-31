//Connect
DB.connect("https://julian.baqend.com");
//Wait for connection
DB.ready(function() {
  $("#hello").text("Hello Baqend");
});
