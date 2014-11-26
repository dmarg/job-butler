'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        templateUrl: 'app/jobs/jobs.html',
        controller: 'JobsCtrl'
      })
      .state('jobs.edit', {
        url: '/edit/:id',
        // templateUrl: 'app/jobs/job-detail-view.html',
        controller:'JobsCtrl'
      })
  });