'use strict';

/**
 * @ngdoc overview
 * @name opendataApp
 * @description
 * # opendataApp
 *
 * Main module of the application.
 */
angular
  .module('opendataApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/calculate', {
        templateUrl: 'views/calc.html',
        controller: 'CalculatorCtrl'
      })
      .when('/', {
        templateUrl: 'views/substances.html',
        controller: 'SubstancesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
