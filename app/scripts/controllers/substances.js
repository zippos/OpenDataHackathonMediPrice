'use strict';

/**
 * @ngdoc function
 * @name opendataApp.controller:SubstancesCtrl
 * @description
 * # SubstancesCtrl
 * Controller of the opendataApp
 */
angular.module('opendataApp')
  .controller('SubstancesCtrl', function ($scope, $http, $modal, $log) {
    $scope.priceList = [];
    $scope.total=0;
    $scope.update = function ( elem) {
      if(elem){
        $scope.param=elem;
      }

      var qparam = angular.uppercase($scope.param);
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE ((den_produs LIKE '%" + qparam +"%') OR (cod_cnpm LIKE '%" + qparam +"%') OR (cod_cim LIKE '%" + qparam +"%') OR (dci LIKE '%" + qparam +"%')) ORDER BY pret_am ASC LIMIT 10"
        }})
      .success(function(data) {
        $scope.meds = data.result.records;
      })
      .error(function(data, status) {
         $scope.errorMessage = "Couldn't load the list of meds, error # " + status;
      });

      if($scope.param == '') {
        $scope.meds = null;
      }

    }


    $scope.init = function () {
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" ORDER BY pret_am ASC LIMIT 10"
        }})
        .success(function(data){
          $scope.meds = data.result.records;
        });
    };

    $scope.moveToPrice = function(medicament) {
      if(!isInPriceListAdd(medicament)){
        medicament.nrprod=1;
        $scope.priceList.push(medicament);
      }
      $scope.total += parseFloat(medicament.pret_am);
    };

    $scope.removeFromPrice = function(medicament) {
      isInPriceListRemove(medicament);
    };

    var isInPriceListAdd = function(obj){
      var isin=false;
      $scope.priceList.forEach(function (elem) {
        if(obj._id == elem._id){
          elem.nrprod++;
          isin=true;
        }
      });
      return isin;
    }


    var isInPriceListRemove = function(obj){
      for(var index = 0; index < $scope.priceList.length; index++) {
        if(obj._id == $scope.priceList[index]._id){
          $scope.total -= parseFloat(obj.pret_am);
          $scope.priceList[index].nrprod--;
          if ($scope.priceList[index].nrprod==0){
            $scope.priceList.splice(index,1);
          }
        }
      }
    }

    $scope.currentMed = function (med){
        $scope.open(med);
    }

    $scope.open = function (med) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return med;
          }
        }
      });
    };
});

angular.module('opendataApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.med = items;
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
