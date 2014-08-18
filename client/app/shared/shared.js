'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shared', {
        url: '/shared',
        templateUrl: 'app/shared/shared.html',
        controller: 'SharedCtrl'
      });
  });