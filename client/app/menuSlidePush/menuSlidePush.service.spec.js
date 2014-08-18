'use strict';

describe('Service: menuSlidePush', function () {

  // load the service's module
  beforeEach(module('jobButlerApp'));

  // instantiate service
  var menuSlidePush;
  beforeEach(inject(function (_menuSlidePush_) {
    menuSlidePush = _menuSlidePush_;
  }));

  it('should do something', function () {
    expect(!!menuSlidePush).toBe(true);
  });

});
