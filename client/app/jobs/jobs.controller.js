'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth, $moment, $window) {
    $scope.user = Auth.getCurrentUser();

    $scope.jobApps = [];

    $scope.stages = {
      "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation', 'Closed']
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


    $scope.createJob = function() {
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
    };

    $scope.shareView = function() {
      var email = $scope.email;

      $http.post('/api/users/shareView', email).success(function(data) {
        $scope.email = '';
        $scope.isCollapsedShare = true;
      })
    };

    $scope.defaultView = true;
    $scope.detailView = false
    $scope.editView = false;
    $scope.openDetails = function(jobApp) {
      $scope.jobDetail = jobApp;
      $scope.defaultView = false;
      $scope.detailView = true;
      console.log(jobApp);
      console.log($scope.jobDetail);
    };
    $scope.openEdit = function(jobDetail) {
      $scope.detailView = false;
      $scope.editView = true;
      $scope.job = jobDetail;
      console.log($scope.job);
    };

    $scope.submitJobEdits = function() {
      var job = $scope.job;
      job.stage[job.stage.length-1].unixTC = $moment().format('X');
      job.stage[job.stage.length-1].date = $moment().format('YYYY-MM-DD');
      $http.put('/api/jobs/'+job._id, job).success(function(data) {
        console.log(data);
        $scope.editView = false;
        $scope.defaultView = true;
      })
    };

    $scope.removeJob = function() {
      var job = $scope.job;
      console.log(job);
      if(confirm('Are you sure you want to delete this pursuit?')) {
        console.log(job);
        var jobId = job._id;
        console.log(jobId);
        $http.delete('/api/jobs/'+jobId).success(function(data) {
          console.log('deleted job response: ', data);
          $window.location.reload();
          $scope.editView = false;
          $scope.defaultView = true;
        })
      }
    };

    $scope.cancelEdit = function () {
      $scope.editView = false;
      $scope.defaultView = true;
    };

  //   $scope.open = function (jobApp) {
  //     $scope.jobApp = jobApp;
  //     $scope.isCollapsedJob = true;
  //     $scope.isCollapsedShare = true;

  //     var modalInstance = $modal.open({
  //       templateUrl: 'editJobModal.html',
  //       controller: 'EditJobCtrl',
  //       resolve: {
  //         jobApps: function () {
  //           return $scope.jobApp;
  //         }
  //       }
  //     });

  //     modalInstance.result.then(function (selectedItem) {
  //       $scope.selected = selectedItem;
  //     }, function () {
  //       $log.info('Modal dismissed at: ' + new Date());
  //     });
  //   };
  // }).controller("EditJobCtrl", function ($scope, $modalInstance, $http, $moment, $window, jobApps) {

  //     $scope.jobModal = jobApps;

  //     console.log($scope.jobModal);
  //     var job = $scope.jobModal;
  //     console.log(job._id);

  //     $scope.stages = {
  //       "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation', 'Closed']
  //     };

      // $scope.submitJobEdits = function() {
      //   job.stage[job.stage.length-1].unixTC = $moment().format('X');
      //   job.stage[job.stage.length-1].date = $moment().format('YYYY-MM-DD');
      //   $http.put('/api/jobs/'+job._id, job).success(function(data) {
      //     console.log(data);
      //     $modalInstance.close();
      //   })
      // };

      // $scope.cancelEdit = function () {
      //   $modalInstance.close();
      // }

      // $scope.removeJob = function() {
      //   if(confirm('Are you sure you want to delete this pursuit?')) {
      //     console.log(job);
      //     var jobId = job._id;
      //     console.log(jobId);
      //     $http.delete('/api/jobs/'+jobId).success(function(data) {
      //       console.log('deleted job response: ', data);
      //       $modalInstance.close();
      //       $window.location.reload();
      //     })
      //   }
      // };

  //     $scope.ok = function () {
  //       $modalInstance.close($scope.selected.item);
  //     };

    });

