'use strict';

angular.module('jobButlerApp')
  .controller('CreatedraftCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.createDraft = function() {
      var draft = {
            userId: "me",
            message: {
              to: "google@google.com",
              subjectLine: "Hello World",
              bodyOfEmail: "Body of the email goes here"
            }
          }

      $http.post('/api/createDrafts/create', draft).success(function(data) {
        console.log('returned from create: ', data.results)
      })
    };
  });
