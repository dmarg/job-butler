'use strict';

angular.module('jobButlerApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Jobs',
      'link': '/jobs'
    }, {
      'title': 'Templates',
      'link': '/templates'
    }, {
      'title': 'Shared',
      'link': '/shared'
    }];


    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.user = Auth.getCurrentUser();

    // console.log('getCurrentUser: ', $scope.getCurrentUser());

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };


  });