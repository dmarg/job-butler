'use strict';

angular.module('jobButlerApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth, $window) {

    $scope.user = Auth.getCurrentUser();
    $scope.sharedWith = $scope.user.sharedWith;
    $scope.sharedWithDisplay = [].concat($scope.user.sharedWith);
    console.log($scope.user);



    $scope.revokeAccess = function(user) {
      console.log("revoke access function called")
      console.log(user);
      $http.get('/api/users/'+user.id).success(function(data) {
        console.log('retrieved user: ', data);
        for (var i = 0; i < data.sharedViews.length; i++) {
          var update;
          console.log('looking for: ', user);
          if($scope.user._id === data.sharedViews[i]) {
            update = data;
            console.log('before splice: ', update.sharedViews);
            update.sharedViews.splice(i, 1);
            console.log('after splice: ', update.sharedViews);
            console.log('user to update: ', update);
            $http.post('/api/users/update/'+update._id, update).success(function(data) {
              console.log(data);
            })
          };
        }
      }).then(function() {
        for(var i=0; i < $scope.user.sharedWith.length; i++) {
          console.log(user);
          if (user.id === $scope.user.sharedWith[i].id) {
            console.log('before splice: ',$scope.user.sharedWith[i].id);
            $scope.user.sharedWith.splice(i, 1);
            console.log('after splice: ', $scope.user.sharedWith[i]);
            $http.post('/api/users/update/'+$scope.user._id, $scope.user).success(function(data) {
              console.log(data);
            }).then(function() {
              $scope.sharedWith = $scope.user.sharedWith || [];
            })
          }
        }
      })

    };

  });
