'use strict';

angular.module('jobButlerApp')
  .controller('EditTemplateCtrl', function ($scope, $http, $stateParams, $location) {
    var id = $stateParams.id;
    $http.get('/api/templates/'+id).success(function(data) {
      $scope.templateToEdit = data;
    });

    $scope.delete = function() {
      if(confirm('Are you sure you want to delete this template?')) {
        var templateId = $scope.templateToEdit._id;
        $http.delete('/api/templates/'+templateId).success(function(data) {
          $location.path('/templates');
        });
      }
    };

    $scope.save = function() {
      var templateId = $scope.templateToEdit._id;
      var template = $scope.templateToEdit;
      $http.put('/api/templates/'+templateId, template).success(function(data) {
        $location.path('/templates/');
      })
    };

    $scope.cancel = function() {
      $location.path('/templates/')
    };
  });
