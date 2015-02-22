  var map;
  var infoWindow;
  var service;


  function initialize() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Location found using HTML5.'
        });

        map.setCenter(pos);
      }, function () {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }


    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: new google.maps.LatLng(44.4477567, 26.098675700000058),
      zoom: 15,
      styles: [
        {
          stylers: [
            {visibility: 'simplified'}
          ]
        },
        {
          elementType: 'labels',
          stylers: [
            {visibility: 'off'}
          ]
        }
      ]
    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
  }

  function performSearch() {
    var request = {
      bounds: map.getBounds(),
      keyword: 'farmacie'
    };
    service.radarSearch(request, callback);
  }

  function callback(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    for (var i = 0, result; result = results[i]; i++) {
      createMarker(result);
    }
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: {
        // Star
        path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
        fillColor: '#ffff00',
        fillOpacity: 1,
        scale: 1 / 4,
        strokeColor: '#bd8d2c',
        strokeWeight: 1
      }
    });

    google.maps.event.addListener(marker, 'click', function () {
      service.getDetails(place, function (result, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }
        infoWindow.setContent(result.name);
        infoWindow.open(map, marker);
      });
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
