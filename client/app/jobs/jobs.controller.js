'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth) {
    $scope.user = Auth.getCurrentUser();

    $scope.job = {
      companyName: '',
      positionTitle: '',
      stage: ''
    };

    $http.get('/api/jobs').success(function(jobs) {
      // console.log('jobs: ', jobs);
      $scope.jobApps = jobs || [];

      // $scope.jobApps = jobs;
      // socket.syncUpdates('job', $scope.jobApps);
    });

    $scope.createJob = function() {
      var job = $scope.job;
      job.userId = $scope.user._id;
      // console.log('job is: ', job);

      $http.post('/api/jobs/create', job).success(function(data) {
        $scope.jobApps.push(data);

        $scope.job = {
          companyName: '',
          positionTitle: '',
          stage: ''
        };

        // console.log('jobApps: ', $scope.jobApps);
        // console.log('data: ', data);
      })
    };


  });
