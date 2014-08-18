'use strict';

angular.module('jobButlerApp')
  .controller('SharedCtrl', function ($scope, $http, Auth) {

    var user = Auth.getCurrentUser();

    $scope.loadSharedViews = function() {
      var sharedViews = [];
      console.log('shared views for current user: ', user.sharedViews);
        $http.get('/api/jobs/sharedViews').success(function(data) {
          console.log('http get request data: ', data);
          $scope.sharedViews = data;
        })
      };
    });