'use strict';

angular.module('jobButlerApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    // $rootScope.$watch("user", function(newval, oldval) {
    //   if(newval) {
    //     $scope.picture = $rootScope.user.pictureLink;
    //   }
    // });



    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = Auth.getCurrentUser();

    console.log('getCurrentUser: ', $scope.getCurrentUser());

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });