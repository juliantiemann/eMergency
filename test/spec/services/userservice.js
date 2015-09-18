'use strict';

describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('eMergencyApp'));

  // instantiate service
  var userService;

  var newUser = {
    id: 11,
    username: "angular-test"
  }

  beforeEach(function(done) {
    inject(function (_userService_, $db) {
      userService = _userService_;
      $db.ready()
        .then(function() {
          $db.User.logout()
            .then(done);
        });
    });
  });

  // it('should get the currently logged in user', function(done) {
  //   done();
  //   // inject(function($db) {
  //   //   $db.User.register(newUser, "angular-test")
  //   //     .then(function(user) {
  //   //       userService.getCurrentUser()
  //   //       expect(userService.user.username).toBe("angular-test");
  //   //       done();
  //   //     }, function() {
  //   //       done.fail("user couldn't be created");
  //   //     });
  //   // })
  // });

  // it('should register and loggin a new user', function(done) {
  //   done();
  //   // inject(function($rootScope, $db, $q) {
  //   //   userService.register(newUser, "angular-test")
  //   //     .then(function() {
  //   //       expect($db.User.me.username).toBe("angular-test");
  //   //       done();
  //   //     });
  //   // });
  // });

  // afterEach(function(done) {
  //   done();
    // inject(function ($db) {
    //   $db.User.logout()
    //     .then(function() {
    //       $db.User.login("root", "root")
    //         .then(function() {
    //           $db.User.find().equal("username", newUser.username).singleResult()
    //             .then(function(user) {
    //               console.log("user delete");
    //               console.log(user);
    //               if(user) {
    //                 user.delete({force:true})
    //                   .then(function() {
    //                     console.log("logout");
    //                     $db.User.logout()
    //                       .then(function() {
    //                         console.log("logged out");
    //                         done();
    //                       });
    //                   });
    //               } else {
    //                 done();
    //               }
    //             }, function() {
    //               done();
    //             });
    //         }, function() {
    //           done.fail("logged in as root failed");
    //         });
    //     });
    // })
  // });

});
