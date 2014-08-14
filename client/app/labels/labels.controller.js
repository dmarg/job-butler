'use strict';

angular.module('jobButlerApp')
  .controller('LabelsCtrl', function ($scope, $http) {
    $scope.createLabel = function() {
      var label = {
        userId: "me",
        labelName: "Job Butler/Fullstack"
      };

      $http.post('/api/labels/create', label).success(function(data) {
        console.log('returned from create: ', data.results)
      })

    };

    $scope.deleteLabel = function() {
      var label = {
        userId: "me",
        labelName: "Job Butler/Microsoft",
        labelId: "Label_6"
      };

      $http.post('/api/labels/delete', label).success(function(data) {
        console.log('returned from delete: ', data.results)
      })

    };
  });
