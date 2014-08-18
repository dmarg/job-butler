'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth) {
    $scope.user = Auth.getCurrentUser();

    $scope.stages = ['Applied', 'Interview', 'Post-Interview', 'Negotiation'];

    $scope.email = {};

    $scope.job = {
      companyName: '',
      positionTitle: '',
      stage: {}
    };

    $http.get('/api/jobs').success(function(jobs) {
      // console.log('jobs: ', jobs);
      $scope.jobApps = jobs || [];

      // $scope.jobApps = jobs;
      // socket.syncUpdates('job', $scope.jobApps);
    });

    // socket.on('job:save', function(_userId) {
    //   if(_userId === $scope.user._id) {

    //   }
    // });


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

    $scope.shareView = function() {
      var email = $scope.email;

      $http.post('/api/users/shareView', email).success(function(data) {
        console.log('posted to users schema: ', data);
      })

    };


  });
