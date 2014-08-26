'use strict';

describe('Controller: TemplatesCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var TemplatesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TemplatesCtrl = $controller('TemplatesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
