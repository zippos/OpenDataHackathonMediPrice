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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/calculate', {
        templateUrl: 'views/calc.html',
        controller: 'CalculatorCtrl'
      })
      .when('/meds', {
        templateUrl: 'views/meds.html',
        controller: 'MedsCtrl'
      })
      .when('/substances', {
        templateUrl: 'views/substances.html',
        controller: 'SubstancesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
