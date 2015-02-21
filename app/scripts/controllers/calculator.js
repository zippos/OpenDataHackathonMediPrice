'use strict';

angular.module('opendataApp')
  .controller('CalculatorCtrl', function ($scope, $http) {
    $scope.cheapest = {};

    var getCheapest = function(name) {
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE den_produs LIKE '" + name +"%' ORDER BY pret_rid ASC LIMIT 3"
        }})
        .success(function(data){
          $scope.cheapest = data.result.records[0];
          console.log($scope.cheapest)
        });
      ;
    }


    getCheapest("ACICLO");



  });
