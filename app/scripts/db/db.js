'use strict';
var DB;
//Connect
DB.connect("https://julian.baqend.com")
  .then(function(success) {
    $("#hello").text("Hello Baqend");


    DB.Todo.find()
      .resultList()
        .then(function(response) {
          $.each(response, function(key, value) {
            $("#hello").append("<p>" + value.name + ", " + value.info + "</p>");
          });
        }, function(response) {
          console.log(response);
        });


    var stream = DB.Todo.find().stream(false);
    console.log(stream);
    stream.on("all", function(response) {
      console.log(response);
    })

  }, function(error) {

  });
