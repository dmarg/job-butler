'use strict';

angular.module('jobButlerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, socket, Auth) {
    $scope.awesomeThings = [];

    $rootScope.user = Auth.getCurrentUser();
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });