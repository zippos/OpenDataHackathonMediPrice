'use strict';

angular.module('opendataApp')
  .controller('CalculatorCtrl', function ($scope, $http) {
    $scope.cheapest = {};
    $scope.select1 ="";
    $scope.names = [];
    $scope.price1="";

     $scope.getCheapest = function(name) {
       name=name.toUpperCase();
       $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE den_produs LIKE '" + name +"%' ORDER BY pret_rid ASC LIMIT 1"
        }})
        .success(function(data){
           $scope.names.pop()
           $scope.names.pop()
           $scope.names.pop()

          $scope.cheapest = data.result.records;
          $scope.cheapest.forEach(function(entry) {
            $scope.names.push(entry.den_produs + " Price: "+ entry.pret_am);
            $scope.prices.push( entry.pret_am );
          });

        });
      ;
    }


    $scope.updatePrice = function(input){
        $scope.price1 = input[input.length-1];
    };

  });


angular.module('opendataApp').directive('autoComplete', function($timeout) {
  return function(scope, iElement, iAttrs) {
    iElement.autocomplete({
      source: scope[iAttrs.uiItems],
      select: function() {
        $timeout(function() {
          iElement.trigger('input');
        }, 0);
      }
    });
  };
});
