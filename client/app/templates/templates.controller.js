'use strict';

angular.module('jobButlerApp')
  .controller('TemplatesCtrl', function ($scope, $http, $location, $window, Auth, $modal, $log) {

    $scope.user = Auth.getCurrentUser();
    $scope.templates = {};

    $scope.pursuit = {
      job: ''
    };

    $scope.email = {
      email: ''
    };

    $scope.deletable = false;
    $scope.showFieldForm = false;
    $scope.showNoMatch = false;
    $scope.updateMatchSuccess = false;
    $scope.isCollapsed = true;
    $scope.draftCreated = false;

    $http.get('/api/jobs').success(function(jobs) {
      $scope.jobApps = jobs || [];
    });

    $http.get('/api/templates/renderTemplates').success(function(data) {
      $scope.templates = data;
      if($scope.templates.length === 0) {
        var template = {
          name: 'Cover Letter',
          body: "<p>Hello [[Contact Name]],</p><p>I'm writing to apply to the [[Position Title]] opening at [[Company Name]]. I am a web developer with experience in JavaScript. I have built RESTful APIs using the MVC framework and relational databases on the back-end, and used JavaScript, HTML5, and CSS3 to create simple, intuitive front-end for web applications.</p><p>I'm looking for a team that's building an innovative product while solving complicated, stimulating problems. I would love to talk more about your product and the engineering profile you're looking for.</p><p>My r&#233;sum&#233; is attached for your convenience. You can also see my portfolio here: [[Portfolio URL]], and read some of the code I've written here: [[Github URL]]. I look forward to being in touch.</p><p>Regards,</p><p>[[My Name]]</p>",
          permanent: true
        };
        $http.post('/api/templates/create', template).success(function(data) {
          $http.get('/api/templates/renderTemplates').success(function(data) {
            $scope.templates = data;
            $scope.currentTemplate = {name: $scope.templates[0].name, body: $scope.templates[0].body};
          })
        })
      }
      else {
        $scope.currentTemplate = {name: $scope.templates[0].name, body: $scope.templates[0].body};
      }
    });

    // $scope.getTextToCopy = function() {
    //   console.log()
    //   return $scope.currentTemplate.body;
    // };

    var fieldToTemplateMatch = {
      'company': 'companyName',
      'company name': 'companyName',
      'position': 'positionTitle',
      'position title': 'positionTitle',
      'your name': 'userName',
      'my name': 'userName',
      'user name': 'userName'
    };

    function fieldMatcher(templateField) {
      return fieldToTemplateMatch[templateField.toLowerCase()];
    }

    $scope.$watch('pursuit.job', function(newVal, oldVal) {
      if(newVal) {
        // debugger;
        // for (var i = 0; i < $scope.jobApps.length; i++) {
          // if($scope.jobApps[i].positionAtCompany === $scope.pursuit.job) {
            for(var j = 0; j < $scope.matchArr.length; j++) {
              var match = $scope.matchArr[j];
              var field = fieldMatcher(match.trimmed);
              if(field && newVal[field]) {
                match.replace = newVal[field];
              }
            }
          // }
        // }
      }

    });

    $scope.findMatches = function() {
      var template = $scope.currentTemplate.body;
      var matches = template.match(/\[\[([^\]]*)\]\]/g);
      if(matches === null) {
        console.log('no matches found', matches);
        $scope.showNoMatch = true;
        return;
      }
      $scope.showFieldForm = true;
      var temp;
      var matchArr = [];
      for(var i=0; i < matches.length; i++) {
        temp = matches[i].split('[[')[1].split(']]')[0];
        var matchObj = {trimmed: temp, original: matches[i]};
        matchObj.replace = '';
        matchArr.push(matchObj);
      };
      $scope.matchArr = matchArr;
      console.log($scope.matchArr);
      $scope.showNoMatch = false;
    };

    $scope.replaceMatches = function() {
      for(var i = 0; i < $scope.matchArr.length; i++) {
        $scope.currentTemplate.body = $scope.currentTemplate.body.replace($scope.matchArr[i].original, $scope.matchArr[i].replace);
      };
      console.log($scope.currentTemplate.body);
      $scope.showFieldForm = false;
      $scope.updateMatchSuccess = true;
    };

    $scope.cancel = function() {
      $scope.showFieldForm = false;
      $scope.pursuit = {
        job: ''
      };
    };

    $scope.renderContent = function(template) {
      $scope.pursuit = {
        job: ''
      };
      console.log(template);
      $scope.currentTemplate = template;

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

          $http.get('/api/templates/renderTemplates').success(function(data) {
            $scope.templates = data;
            $scope.currentTemplate = {name: $scope.templates[0].name, body: $scope.templates[0].body};
          });
        });
      }
    };

    $scope.sendTemplate = function() {
      console.log($scope.currentTemplate);
        var message = {
          userId: "me",
          message: {
            to: $scope.email.email,
            subjectLine: "My "+$scope.currentTemplate.name+" template sent via the Job Butler App.",
            bodyOfEmail: $scope.currentTemplate.body
          }
        }
        $http.post('/api/messages/send', message).success(function(data) {
          console.log('returned from create: ', data.results)
          $scope.isCollapsed = true;
          $scope.email = {
            email: ''
          };
        })
      // var email = {email: $scope.email}
      // console.log('sending to backend: ', email)
      // $http.get('/api/users/checkEmail', email).success(function() {

      //   }).error(function() {
      //     console.log('email not registered with Job Butler.')
      //     $scope.showEmailError = true;
      //   })
    };

    $scope.createDraft = function() {
      if ($scope.currentTemplate.body === '') {
        alert('The text area is empty!')
      }
      else {
        var draft = {
              userId: "me",
              message: {
                to: "",
                subjectLine: "Template Draft from JobButler",
                bodyOfEmail: $scope.currentTemplate.body
              }
            }

        $http.post('/api/drafts/create', draft).success(function(data) {
          $scope.draftCreated = true;
          console.log('returned from create: ', data.results)
        })
      }
    };


  });

