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
      'title': 'Shared',
      'link': '/shared'
    }, {
      'title': 'Templates',
      'link': '/templates'
    }];

    // $rootScope.$watch("user", function(newval, oldval) {
    //   if(newval) {
    //     $scope.picture = $rootScope.user.pictureLink;
    //   }
    // });

    // $scope.menuRight = [{
    //     'title': 'Settings',
    //     'link': '/settings'
    //   },{
    //     'title': 'Logout',
    //     'link': '/settings'
    //   }
    // ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = Auth.getCurrentUser();

    console.log('getCurrentUser: ', $scope.getCurrentUser());

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });