'use strict';

angular.module('jobButlerApp')
  .controller('MessagesCtrl', function ($scope, $http) {

    $scope.application = {
      to: '',
      subjectLine: '',
      bodyOfEmail: ''
    };

    $scope.sendApplication = function() {
      var message = {
        userId: "me",
        message: {
          to: $scope.application.to,
          subjectLine: $scope.application.subjectLine,
          bodyOfEmail: $scope.application.bodyOfEmail
        }
      };

      $scope.application = {
        to: '',
        subjectLine: '',
        bodyOfEmail: ''
      };

      $http.post('/api/messages/send', message).success(function(data) {
        console.log('returned from create: ', data.results)
      })
    };



    $scope.sendMessage = function() {
      var message = {
        userId: "me",
        message: {
          to: "daniel.margol@gmail.com",
          subjectLine: "Hello World",
          bodyOfEmail: "Body of the email goes here"
        }
      }

      $http.post('/api/messages/send', message).success(function(data) {
        console.log('returned from create: ', data.results)
      })
    };
  });
