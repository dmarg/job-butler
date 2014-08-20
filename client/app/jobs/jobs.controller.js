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

    $scope.filterOptions = {};

    $scope.isCollapsedJob = true;
    $scope.isCollapsedShare = true;

    var removeTemplate = '<input class="btn" type="button" value="remove" ng-click="removeRow($index)" />';
    $scope.removeRow = function() {
      // console.log(this.row.entity._id);
      var jobId = this.row.entity._id;
      var job = {id: jobId};
      var index = this.row.rowIndex;
      $scope.gridOptions.selectItem(index, false);
      $scope.jobApps.splice(index, 1);
      $http.delete('/api/jobs/'+jobId).success(function(data) {
        console.log('deleted job response: ', data);
      })
    };

    $scope.gridOptions = {
      data: 'jobApps',
      enableCellSelection: false,
      enableRowSelection: false,
      filterOptions: $scope.filterOptions,
      columnDefs: [ {field: 'companyName', displayName: 'Company Name', width: 150},
                    {field: 'positionTitle', displayName: 'Position Title', width: 150},
                    {field: 'stage[0].stageName', displayName: 'Stage', width: 150},
                    {field: 'remove', displayName: '', cellTemplate: removeTemplate, width: 150}]
    };

    $http.get('/api/jobs').success(function(jobs) {
      $scope.jobApps = jobs || [];
      console.log($scope.jobApps);
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

    $scope.shareView = function() {
      var email = $scope.email;

      $http.post('/api/users/shareView', email).success(function(data) {
        $scope.email = '';
      })
    };
  });
