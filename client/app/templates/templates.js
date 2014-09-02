'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('templates', {
        url: '/templates',
        templateUrl: 'app/templates/templates.html',
        controller: 'TemplatesCtrl'
      })
      .state('templates.id', {
        url: '/:id',
        templateUrl: 'app/templates/templates.html',
        controller: 'TemplatesCtrl'
      })
      .state('templates.name.update', {
        url: '/updatefields'
        // templateUrl: 'app/templates/templates.html'
      });
  });