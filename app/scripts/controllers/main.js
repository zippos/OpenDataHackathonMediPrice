'use strict';

/**
 * @ngdoc function
 * @name opendataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opendataApp
 */
angular.module('opendataApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
