'use strict';

angular.module('jobButlerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, socket, Auth) {

    $scope.user = Auth.getCurrentUser();
    console.log($scope.user);
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.job = {
      url: ''
    };



    $scope.scrapeLink = function() {

      $http.post('/api/joblinks/scrape', $scope.job).success(function(data) {
        console.log('returned from scrape: ', data);

        $scope.job = {
          link: ''
        };
      });

    };

  });