'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new-template', {
        url: '/new-template',
        templateUrl: 'app/new-template/new-template.html',
        controller: 'NewTemplateCtrl'
      });
  });