'use strict';

describe('Controller: MessagesCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var MessagesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessagesCtrl = $controller('MessagesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
