'use strict';

describe('Controller: EditTemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var EditTemplateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditTemplateCtrl = $controller('EditTemplateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
