'use strict';

describe('Controller: SharedCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var SharedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SharedCtrl = $controller('SharedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
