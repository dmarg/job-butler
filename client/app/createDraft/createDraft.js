'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createDraft', {
        url: '/createDraft',
        templateUrl: 'app/createDraft/createDraft.html',
        controller: 'CreatedraftCtrl'
      });
  });