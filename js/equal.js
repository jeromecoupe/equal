var Map = (function(){

  'use strict';

  // variables
  var map;
  var mapContainer;

  // map config
  var mapLatLong = new google.maps.LatLng(50.8270,4.3726);
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
    var markerImg = 'img/icon_map.png';
    var mapMarker = new google.maps.Marker({
        position: mapLatLong,
        map: map,
        icon: markerImg
    });

    // click event on marker
    google.maps.event.addListener(mapMarker, 'click', function() {
      window.location.href = 'https://goo.gl/maps/SPzd3';
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
/*! svg4everybody v1.0.0 | github.com/jonathantneal/svg4everybody */
(function(e,t,n,r,i){function s(t,n){if(n){var r=n.getAttribute("viewBox"),i=e.createDocumentFragment(),s=n.cloneNode(true);if(r){t.setAttribute("viewBox",r)}while(s.childNodes.length){i.appendChild(s.childNodes[0])}t.appendChild(i)}}function o(){var t=this,n=e.createElement("x"),r=t.s;n.innerHTML=t.responseText;t.onload=function(){r.splice(0).map(function(e){s(e[0],n.querySelector("#"+e[1].replace(/(\W)/g,"\\$1")))})};t.onload()}function u(){var i;while(i=t[0]){var a=i.parentNode,f=i.getAttribute("xlink:href").split("#"),l=f[0],c=f[1];a.removeChild(i);if(l.length){var h=r[l]=r[l]||new XMLHttpRequest;if(!h.s){h.s=[];h.open("GET",l);h.onload=o;h.send()}h.s.push([a,c]);if(h.readyState===4){h.onload()}}else{s(a,e.getElementById(c))}}n(u)}if(i){u()}})(document,document.getElementsByTagName("use"),window.requestAnimationFrame||window.setTimeout,{},/Trident\/[567]\b/.test(navigator.userAgent))
