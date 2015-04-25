'use strict';

/**
 * @ngdoc function
 * @name opendataApp.controller:SubstancesCtrl
 * @description
 * # SubstancesCtrl
 * Controller of the opendataApp
 */
angular.module('opendataApp')
  .controller('SubstancesCtrl', function ($scope, $http, $modal, $window, $location) {
    $scope.priceList = [];
    $scope.total=0;

    $scope.seeForum = function() {
      $location.path("/forum");

    }

    $scope.update = function ( elem) {
      if(elem){
        $scope.param=elem;
      }

      var qparam = angular.uppercase($scope.param);
      $http({
        url:"http://data.gov.ro/api/action/datastore_search_sql",
        method:"GET",
        params:{
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" WHERE ((den_produs LIKE '%" + qparam +"%') OR (cod_cnpm LIKE '%" + qparam +"%') OR (cod_cim LIKE '%" + qparam +"%') OR (dci LIKE '%" + qparam +"%')) ORDER BY pret_am ASC LIMIT 30"
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
          sql: "SELECT * from \"a847b387-5f87-421d-97b0-8481f04d1359\" ORDER BY pret_am ASC LIMIT 30"
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

    $scope.increaseElement = function(obj) {
      $scope.priceList.forEach(function (elem) {
        if(obj._id == elem._id){
          elem.nrprod++;
          $scope.total += parseFloat(obj.pret_am);
                }
      });
    };

    $scope.decreaseElement = function(obj) {
      for(var index = 0; index < $scope.priceList.length; index++) {
        if(obj._id == $scope.priceList[index]._id){
          $scope.priceList[index].nrprod--;
          $scope.total -= parseFloat(obj.pret_am);
          if ($scope.priceList[index].nrprod==0){
            $scope.priceList.splice(index,1);
          }
        }
      };
    };

    $scope.removeFromPrice = function(medicament) {
      isInPriceListRemove(medicament);
    };

    var isInPriceListAdd = function(obj){
      var isin=false;
      if($scope.priceList) {
        $scope.priceList.forEach(function (elem) {
          if(obj._id == elem._id){
            elem.nrprod++;
            isin=true;
          }
        });
      }
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

    $scope.clearList = function(){
      $scope.priceList.splice(0,$scope.priceList.length);
      $scope.total =0;

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

    $scope.saveMeds = function() {
      window.localStorage.setItem("medicamente_salvate", JSON.stringify($scope.priceList));
      window.localStorage.setItem("medicamente_total", JSON.stringify($scope.total));
    };

    $scope.loadMeds = function() {
      var storedMeds = JSON.parse(window.localStorage.getItem("medicamente_salvate"));
      var storedTotal = JSON.parse(window.localStorage.getItem("medicamente_total"));
      if(storedMeds) {
        $scope.priceList = storedMeds;
        $scope.total = storedTotal;
      }
    };

    $scope.delMeds = function(med) {
      window.localStorage.removeItem("medicamente_salvate", JSON.stringify(med));
    };

    $scope.animatePanel = function() {
      var w = angular.element($window).width();
      if(w<=1355) {
        if($(".panel").height() <= 90) {
          $( ".panel" ).animate({
            height: "400px"
          }, 400);
            $(".classUP").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        } else {
          $( ".panel" ).animate({
            height: "87px"
          }, 400);
          $(".classUP").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        }
      }
    }

});

angular.module('opendataApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.med = items;
  $scope.ok = function () {
    $modalInstance.close();
  };
});
