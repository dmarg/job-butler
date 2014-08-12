'use strict';

describe('Controller: CreatedraftCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var CreatedraftCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatedraftCtrl = $controller('CreatedraftCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
