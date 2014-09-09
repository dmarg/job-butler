'use strict';

angular.module('jobButlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit-template', {
        url: '/edit-template/:id',
        templateUrl: 'app/edit-template/edit-template.html',
        controller: 'EditTemplateCtrl'
      });
  });