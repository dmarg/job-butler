'use strict';

angular.module('jobButlerApp')
  .controller('JobsCtrl', function ($scope, $rootScope, socket, $http, Auth, $moment) {
    $scope.user = Auth.getCurrentUser();

    // $scope.timeNow = function() {
    //   console.log($moment().format('X'));
    //   // console.log($moment('1408550400', 'X').format('YYYY-MM-DD'));
    // };

    $scope.stages = {
      "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation']
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
      })
    };
  });
