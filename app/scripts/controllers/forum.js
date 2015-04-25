/**
 * Created by bogdanmatra on 25/04/15.
 */
angular.module('opendataApp')
  .controller('ForumCtrl', function ($scope, $rootScope){
    $rootScope.questions=[ { title: 'Intrebare 1 ', comments: ['Comment1', 'Comment 2']},
                       { title: 'Intrebare 2 ', comments: ['Comment1', 'Comment 2']} ];
    $scope.title;
    $scope.seeComments = function( comments, index ){
      $rootScope.comments = comments;
      $rootScope.questionIndex = index;
      $location.path('/comments');
    }

    $scope.addQuestion = function(  ) {
      var q = {title: $scope.title, comments: []};
      $scope.questions.push(q);
    }



    });
