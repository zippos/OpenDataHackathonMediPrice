'use strict';

angular.module('opendataApp')
  .controller('CalculatorCtrl', function ($scope) {



    var data = {
      resource_id: 'a847b387-5f87-421d-97b0-8481f04d1359', // the resource id
      limit: 5, // get 5 results
      q: 'jones' // query for 'jones'
    };
    $.ajax({
      url: 'http://data.gov.ro/api/action/datastore_search',
      data: data,
      dataType: 'jsonp',
      success: function(data) {
        alert('Total results found: ' + data.result.total)
      }
    });



  });
