'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('drafts', {
        url: '/drafts',
        templateUrl: 'app/drafts/drafts.html',
        controller: 'DraftsCtrl'
      });
  });