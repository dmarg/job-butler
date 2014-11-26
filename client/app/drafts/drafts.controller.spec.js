'use strict';

describe('Controller: DraftsCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var DraftsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DraftsCtrl = $controller('DraftsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
