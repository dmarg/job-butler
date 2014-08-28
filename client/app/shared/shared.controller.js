'use strict';

angular.module('jobButlerApp')
  .controller('SharedCtrl', function ($scope, $http, $modal, $log, Auth) {

    var user = Auth.getCurrentUser();


    var sharedViews = [];
    $http.get('/api/jobs/sharedViews').success(function(data) {
      // console.log('http get request data: ', data);
      $scope.sharedViews = data;
      $scope.sharedViewsDisplay = [].concat($scope.sharedViews);
    });

    $scope.defaultView = true;
    $scope.detailView = false;
    $scope.openDetail = function(job) {
      // console.log(job);
      $scope.job = job;
      $scope.defaultView = false;
      $scope.detailView = true;
    };

    $scope.back = function() {
      $scope.defaultView = true;
      $scope.detailView = false;
    }

    // $scope.open = function (jobApp) {
    //   console.log(jobApp);
    //   $scope.jobApp = jobApp
    //   $scope.isCollapsedJob = true;
    //   $scope.isCollapsedShare = true;

    //   var modalInstance = $modal.open({
    //     templateUrl: 'editJobModal.html',
    //     controller: 'SharedDetailsCtrl',
    //     resolve: {
    //       jobApps: function () {
    //         return $scope.jobApp;
    //       }
    //     }
    //   });

    //   modalInstance.result.then(function (selectedItem) {
    //     $scope.selected = selectedItem;
    //   }, function () {
    //     $log.info('Modal dismissed at: ' + new Date());
    //   });
    // };
    // }).controller("SharedDetailsCtrl", function ($scope, $modalInstance, $http, $moment, $window, jobApps) {

    //   $scope.jobModal = jobApps;

    //   console.log($scope.jobModal);
    //   var job = $scope.jobModal;
    //   console.log(job._id);

    //   $scope.stages = {
    //     "values": ['Applied', 'Interview', 'Post-Interview', 'Negotiation', 'Closed']
    //   };

    //   $scope.closeModal = function () {
    //     $modalInstance.close();
    //   }
  });