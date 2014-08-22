'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth, $moment, $modal, $log) {
    $scope.user = Auth.getCurrentUser();


    $scope.jobApps = [];

    $scope.stages = {
      "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation', 'Closed']
    };

    $scope.email = {};

    $scope.job = {
      companyName: '',
      positionTitle: '',
      link: '',
      stage: {
        stageName: "Applied",
        notes: ''
      }
    };

    $scope.filterOptions = {};

    $scope.isCollapsedJob = true;
    $scope.isCollapsedShare = true;

    // var removeTemplate = '<input class="btn" type="button" value="remove" ng-click="removeRow($index)" />';
    // $scope.removeRow = function() {
    //   // console.log(this.row.entity._id);
    //   var jobId = this.row.entity._id;
    //   var job = {id: jobId};
    //   var index = this.row.rowIndex;
    //   $scope.gridOptions.selectItem(index, false);
    //   $scope.jobApps.splice(index, 1);
    //   $http.delete('/api/jobs/'+jobId).success(function(data) {
    //     console.log('deleted job response: ', data);
    //   })
    // };


    $http.get('/api/jobs').success(function(jobs) {
      $scope.jobApps = jobs || [];
      $scope.jobAppsDisplay = [].concat($scope.jobApps);
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
          link: '',
          stage: {
            stageName: "Applied",
            notes: ''
          }
        };

        // console.log('jobApps: ', $scope.jobApps);
        // console.log('data: ', data);
      })
    };

    $scope.shareView = function() {
      var email = $scope.email;

      $http.post('/api/users/shareView', email).success(function(data) {
        $scope.email = '';
        $scope.isCollapsedShare = true;
      })
    };

    $scope.open = function (jobApp) {
      $scope.jobApp = jobApp
      $scope.isCollapsedJob = true;
      $scope.isCollapsedShare = true;

      var modalInstance = $modal.open({
        templateUrl: 'editJobModal.html',
        controller: 'EditJobCtrl',

        // size: size,
        resolve: {
          jobApps: function () {
            return $scope.jobApp;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };




  }).controller("EditJobCtrl", function ($scope, $modalInstance, $http, $moment, jobApps) {

      $scope.jobModal = jobApps;
      console.log($scope.jobModal);
      var job = $scope.jobModal;
      console.log(job._id);

      $scope.stages = {
        "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation', 'Closed']
      };

      $scope.submitJobEdits = function() {
        job.stage[job.stage.length-1].unixTC = $moment().format('X');
        job.stage[job.stage.length-1].date = $moment().format('YYYY-MM-DD');
        $http.put('/api/jobs/'+job._id, job).success(function(data) {
          console.log(data);
          $modalInstance.close();
          })
        };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

    });

