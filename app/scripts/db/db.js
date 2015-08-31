'use strict';
var DB;
//Connect
DB.connect("http://julian.baqend.com")
  .then(function(response) {
    $("#hello").text("Hello Baqend");
  }, function(response) {

  });
