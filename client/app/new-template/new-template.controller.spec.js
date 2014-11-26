'use strict';

describe('Controller: NewTemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('jobButlerApp'));

  var NewTemplateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewTemplateCtrl = $controller('NewTemplateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
