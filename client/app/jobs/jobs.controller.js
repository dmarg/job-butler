'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth, $moment, $window) {
    $scope.user = Auth.getCurrentUser();
    console.log($scope.user);

    $scope.jobApps = [];

    $scope.stages = {
      "values": ['To Apply', 'Applied', 'Interview Scheduled', 'Post-Interview', 'Offer Received', 'Closed']
    };

    $scope.email = {};

    $scope.job = {
      companyName: '',
      positionTitle: '',
      url: '',
      jobDetails: '',
      stage: {
        stageName: "Applied",
        notes: ''
      }
    };

    $scope.filterOptions = {};
    $scope.isCollapsedJob = true;
    $scope.isCollapsedShare = true;
    $scope.showEmailError = false;
    $scope.emailDuplicateError = false;
    $scope.disableEditJob = true;
    $scope.shareSuccess = false;
    $scope.incompleteFields = false;

    $scope.closeEmailError = function() {
      $scope.showEmailError = false;
    };

    $scope.closeEmailDuplicate = function() {
      $scope.emailDuplicateError = false;
    };

    $scope.closeShareSuccess = function() {
      $scope.shareSuccess = false;
    }

    $http.get('/api/jobs').success(function(jobs) {
      $scope.jobApps = jobs || [];
      $scope.jobAppsDisplay = [].concat($scope.jobApps);
    });

    $scope.$watch('job.url', function(newVal, oldVal) {

      console.log('newVal:', newVal, ' oldVal: ', oldVal);

      if(newVal === "") {
        $scope.job = {
          companyName: '',
          positionTitle: '',
          url: '',
          jobDetails: '',
          stage: {
            stageName: "Applied",
            notes: ''
          }
        };
      } else if(newVal.length > 5) {
        $http.post('/api/joblinks/scrape', $scope.job).success(function(data) {
          console.log('returned from scrape: ', data);
          $scope.job.companyName = data.companyName;
          $scope.job.positionTitle = data.positionTitle;
          $scope.job.jobDetails = data.jobDetails;
        })
      }

    });


    $scope.fromNow = function(date) {
      return $moment(date, 'X').fromNow();
    };

    $scope.createJob = function() {

      if ($scope.job.companyName.length > 0 && $scope.job.positionTitle.length > 0) {
        var job = $scope.job;
        job.userId = $scope.user._id;
        // console.log('job is: ', job);
        $scope.job.stage.unixTC = $moment().format('X');
        $scope.job.stage.date = $moment().format('YYYY-MM-DD');

        $http.post('/api/jobs/create', job).success(function(data) {
          console.log(data);
          $scope.jobApps.push(data);
          $scope.isCollapsedJob = true;
          $scope.job = {
            companyName: '',
            positionTitle: '',
            url: '',
            jobDetails: '',
            stage: {
              stageName: "Applied",
              notes: ''
            }
          };
        })
      }
      else {
        $scope.incompleteFields = true;
      }

    };

    $scope.shareView = function() {
      var email = $scope.email;

      if($scope.user.email === email.email) {
        console.log('same email')
        $scope.email = {};
        $scope.showEmailError = true;
        return;
      }

      var counter = 0;
      for(var i = 0; i < $scope.user.sharedWith.length; i++) {
        if($scope.user.sharedWith[i].email === email.email) {
          counter++;
        }
      }

      if (counter === 0) {
        console.log('adding user');
        $http.post('/api/users/shareView', email).success(function(data) {
          $scope.sharedEmail = email.email;
          $scope.email = {};
          $scope.isCollapsedShare = true;
          $scope.shareSuccess = true;
          $scope.user.sharedWith = data;
          console.log('data from shared: ', data);
        }).error(function() {
          $scope.showEmailError = true;
        })
      }
      else {
        console.log('email already shared with');
        $scope.emailDuplicateError = true;
      }
    };

    $scope.defaultView = true;
    $scope.detailAndEditView = false;

    $scope.openDetails = function(jobApp) {
      $scope.jobView = jobApp;
      $scope.defaultView = false;
      $scope.detailAndEditView = true;

      $scope.isCollapsedJob = true;
      $scope.isCollapsedShare = true;
      // console.log(jobApp);
      // console.log($scope.jobView);
    };

    // $scope.openEdit = function(jobView) {
    //   $scope.detailView = false;
    //   $scope.editView = true;
    //   $scope.jobView = jobView;
    //   console.log($scope.jobView);
    // };

    $scope.submitJobEdits = function() {
      var job = $scope.jobView;

      job.stage[job.stage.length-1].unixTC = $moment().format('X');
      job.stage[job.stage.length-1].date = $moment().format('YYYY-MM-DD');

      $http.put('/api/jobs/'+job._id, job).success(function(data) {
        console.log(data);
        $scope.detailAndEditView = false;
        $scope.defaultView = true;
        $scope.disableEditJob = true;
      })
    };

    $scope.removeJob = function() {
      var job = $scope.jobView;
      console.log(job);
      if(confirm('Are you sure you want to delete this pursuit?')) {
        console.log(job);
        var jobId = job._id;
        console.log(jobId);
        $http.delete('/api/jobs/'+jobId).success(function(data) {
          console.log('deleted job response: ', data);

          $http.get('/api/jobs').success(function(jobs) {
            $scope.jobApps = jobs || [];
            $scope.jobAppsDisplay = [].concat($scope.jobApps);
          });

          $scope.detailAndEditView = false;
          $scope.defaultView = true;
          $scope.disableEditJob = true;
        })
      }
    };

    $scope.defaultAndDetailToggle = function () {
      $scope.detailAndEditView = false;
      $scope.defaultView = true;
      $scope.disableEditJob = true;
    };

    $scope.cancelAdd = function() {
      $scope.job = {
        companyName: '',
        positionTitle: '',
        url: '',
        jobDetails: '',
        stage: {
          stageName: "Applied",
          notes: ''
        }
      };

      $scope.isCollapsedJob = true;
      $scope.isCollapsedShare = true;
    }

    $scope.cancelShare = function() {
      $scope.email = {};

      $scope.isCollapsedJob = true;
      $scope.isCollapsedShare = true;
    }

    $scope.editViewJobToggle = function() {
      if($scope.disableEditJob === true) {
        $scope.disableEditJob = false;
      } else {
        $scope.disableEditJob = true;
      }
    }

});

