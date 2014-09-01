'use strict';

angular.module('jobButlerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'angular-momentjs',
  'smart-table',
  'textAngular',
  'ngClipboard'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $momentProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html'
      })
      .state('jobs.edit', {
        url: '/edit/:id',
        templateUrl: 'app/jobs/job-detail-view.html'
      })
      .state('templates.name', {
        url: '/:name',
        templateUrl: 'app/templates/templates.html'
      })
      .state('templates.name.update', {
        url: '/updatefields'
        // templateUrl: 'app/templates/templates.html'
      })
      .state('shared.detail', {
        url: '/:id',
        templateUrl: 'app/shared/shared.html'
      })

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $momentProvider
      .asyncLoading(false)
      .scriptUrl('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          // $location.path('/');
          // remove any stale tokens
          // $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
  });