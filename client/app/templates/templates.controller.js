'use strict';

angular.module('jobButlerApp')
  .controller('TemplatesCtrl', function ($scope, $http, $location, $window, Auth) {

    $scope.user = Auth.getCurrentUser();
    $scope.templates = '';

    $scope.email = '';
    $scope.deletable = false;
    $scope.isCollapsed = true;

    $scope.renderContent = function(template) {
      console.log(template);
      $scope.currentTemplate = template;

      // $scope.htmlVariable = template.body;
      if (template.permanent === false) {
        $scope.deletable = true;
      }
      else {
        $scope.deletable = false;
      }
    };

    $scope.newTemplate = function() {
      $location.path('/new-template');
    };

    $scope.deleteTemplate = function() {
      if(confirm('Are you sure you want to delete this template?')) {
        var templateId = $scope.currentTemplate._id;
        $http.delete('/api/templates/'+templateId).success(function(data) {
          console.log('delete success')
          $window.location.reload();
        });
      }
    };

    // $scope.shareTemplate = function() {
    //   console.log('sharing template');
    //   var email = $scope.email;

    //   $http.post('/api/users/shareTemplate', email).success(function(data) {
    //     $scope.email = '';
    //     $scope.isCollapsedShare = true;
    //   })
    // };

    $scope.sendTemplate = function() {
      var message = {
        userId: "me",
        message: {
          to: $scope.email,
          subjectLine: "My "+$scope.currentTemplate.name+" template sent via the Job Butler App.",
          bodyOfEmail: $scope.currentTemplate.body
        }
      }

      $http.post('/api/messages/send', message).success(function(data) {
        console.log('returned from create: ', data.results)
        $scope.email = '';
      })
    };

    $scope.createDraft = function() {
      if ($scope.htmlVariable === '') {
        alert('The text area is empty!')
      }
      else {
        var draft = {
              userId: "me",
              message: {
                to: "",
                subjectLine: "Template Draft from JobButler",
                bodyOfEmail: $scope.htmlVariable
              }
            }

        $http.post('/api/drafts/create', draft).success(function(data) {
          console.log('returned from create: ', data.results)
        })
      }
    };

    $http.get('/api/templates/renderTemplates').success(function(data) {
      console.log('http get request data: ', data);
      $scope.templates = data;
      $scope.htmlVariable = $scope.templates[0].body;
      $scope.currentTemplate = {name: $scope.templates[0].name, body: $scope.templates[0].body};
    });

  });
