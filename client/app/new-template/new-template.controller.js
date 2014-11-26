'use strict';

angular.module('jobButlerApp')
  .controller('NewTemplateCtrl', function ($scope, $location, $http, Auth) {

    $scope.user = Auth.getCurrentUser();

    $scope.newTemplate = {
      name: '',
      body: '',
      _userId: $scope.user._id,
      permanent: false
    };

    $scope.save = function () {
      if(typeof $scope.newTemplate.name === 'undefined' || $scope.newTemplate.name.length === 0) {
        alert('Give this template a name!')
        return;
      }
      var template = $scope.newTemplate;
      $http.post('/api/templates/create', template).success(function(data) {
        console.log(data);
        $location.path('/templates');
      })

    };
    $scope.cancel = function () {
      $location.path('/templates');
    };
  });
