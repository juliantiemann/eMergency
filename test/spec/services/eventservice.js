'use strict';

describe('Service: eventService', function () {

  // load the service's module
  beforeEach(module('eMergencyApp'));

  // instantiate service
  var eventService;
  beforeEach(inject(function (_eventService_) {
    eventService = _eventService_;
  }));

  // it('should persist a new event in the database', function () {
  //   var test = this;
  //   var persistentEvent;
  //   eventService.add({})
  //     .then(
  //       function(response) {
  //         persistentEvent = response;
  //         persistentEvent.delete();
  //         test.success();
  //       },
  //       function(error) {
  //         test.fail();
  //       }
  //     );
  // });

  it('should do something', function () {
    expect(!!eventService).toBe(true);
  });

});
