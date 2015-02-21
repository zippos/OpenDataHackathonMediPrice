'use strict';

/**
 * @ngdoc function
 * @name opendataApp.controller:SubstancesCtrl
 * @description
 * # SubstancesCtrl
 * Controller of the opendataApp
 */
angular.module('opendataApp')
  .controller('SubstancesCtrl', function ($scope, $http) {

    $scope.getValue = function () {
      var qparam = $scope.param;
      $http.get("http://data.gov.ro/api/action/datastore_search?resource_id=a847b387-5f87-421d-97b0-8481f04d1359&q=" + qparam)
  
      .success(function(data, status, headers, config) {
        $scope.meds = data.result.records;
        console.log(data.result.records.den_produs);
      })
      .error(function(data, status, headers, config) {
         $scope.errorMessage = "Couldn't load the list of meds, error # " + status;
      });
    }

});