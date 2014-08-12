'use strict';

angular.module('jobButlerApp')
  .controller('CreatedraftCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.createDraft = function() {
      var draft = {
            userId: 'me',
            message: {
              raw: "Hello World"
            }
          }

      $http.post('/api/createDrafts/create', draft).success(function(data) {
        console.log('returned from create: ', data.results)
      })
    };
  });
