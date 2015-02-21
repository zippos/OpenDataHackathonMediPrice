'use strict';

var app=angular.module('opendataApp');
app
  .controller('MedsCtrl', ['$scope','$http','$location', function ($scope,$http,$location) {

    $scope.getMed = function () {
      var searchFilter=$scope.nameMed;
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE ((den_produs LIKE '%" + searchFilter +"%') OR (cod_cnpm LIKE '%" + searchFilter +"%') OR (cod_cim LIKE '%" + searchFilter +"%')) LIMIT 10"
        }})
        .success(function(data){
          $scope.meds = data.result.records;
          console.log($scope.cheapest)
        });

    };

    $scope.init = function () {
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" LIMIT 10"
        }})
        .success(function(data){
          $scope.meds = data.result.records;

        });


    };
  }]);

