'use strict';

angular.module('jobButlerApp')
  .controller('DraftsCtrl', function ($scope, $http) {

    $scope.createDraft = function() {
      var draft = {
            userId: "me",
            message: {
              to: "google@google.com",
              subjectLine: "Hello World",
              bodyOfEmail: "Body of the email goes here"
            }
          }

      $http.post('/api/drafts/create', draft).success(function(data) {
        console.log('returned from create: ', data.results)
      })
    };

  });
