'use strict';

angular.module('jobButlerApp')
  .controller('SharedCtrl', function ($scope, $http, Auth) {

    var user = Auth.getCurrentUser();

    $scope.filterOptions = {};

    $scope.gridOptions = {
    data: 'sharedViews',
    enableCellSelection: false,
    enableRowSelection: false,
    filterOptions: $scope.filterOptions,
    columnDefs: [ {field: 'user.name', displayName: 'Name'},
                  {field: 'companyName', displayName: 'Company Name'},
                  {field: 'positionTitle', displayName: 'Position Title'},
                  {field: 'stage[0].stageName', displayName: 'Status'} ]
    };

    var sharedViews = [];
    $http.get('/api/jobs/sharedViews').success(function(data) {
      console.log('http get request data: ', data);
      $scope.sharedViews = data;
    })

  });