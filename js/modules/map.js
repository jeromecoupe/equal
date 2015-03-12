var Map = (function(){

  'use strict';

  // variables
  var map;
  var mapContainer;

  // map config
  var mapLatLong = new google.maps.LatLng(50.8276,4.3726);
  var mapConfig = {
    center: mapLatLong,
    zoom: 16,
    draggable: true,
    disableDoubleClickZoom: false,
    scrollwheel: false,
    panControl: false,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROAD,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.ROAD,
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };

  // Design options
  var mapDesign = [
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "color": "#EBECEC" }
      ]
    },{
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "simplified" },
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "transit",
      "elementType": "labels.icon",
      "stylers": [
        { "lightness": 50 },
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "color": "#656769" }
      ]
    }
  ];

  // check dependencies
  var checkDependencies = function() {
    return ('querySelector' in document);
  };

  // initiate
  var init = function(){

    // if dependencies are met select div and build map
    if(checkDependencies) {
      mapContainer = document.querySelector('.js-gmap');
      buildMap(mapContainer, mapConfig, mapDesign);
    }

  };

  // Build the map
  var buildMap = function(container, config, design){

    //build map
    var map = new google.maps.Map(container, config);

    // apply design
    map.setOptions({styles: design});

    // set and apply marker
    var markerImg = '/img/icon_map.png';
    var mapMarker = new google.maps.Marker({
        position: mapLatLong,
        map: map,
        icon: markerImg
    });

    //recenter map on resize
    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });

  };

  return {
    init: init
  };

})();

Map.init();