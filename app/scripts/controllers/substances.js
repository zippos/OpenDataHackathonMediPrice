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

    $scope.update = function () {
      
      var qparam = angular.uppercase($scope.param);
      $http.get("http://data.gov.ro/api/action/datastore_search_sql?sql=SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE dci LIKE '" + qparam +"%' ORDER BY pret_am ASC")
  
      .success(function(data, status, headers, config) {
        $scope.meds = data.result.records;
      })
      .error(function(data, status, headers, config) {
         $scope.errorMessage = "Couldn't load the list of meds, error # " + status;
      });

      if($scope.param == '') {
        $scope.meds = null;
      }
      
    }

});