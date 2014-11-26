'use strict';

describe('Controller: LabelsCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var LabelsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabelsCtrl = $controller('LabelsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
