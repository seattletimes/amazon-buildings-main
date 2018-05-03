//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./amazonbuildings.geo.json");

var all = "amazonbuildingsownership";

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
  layer.on({
  	     mouseover: function(e) {
        layer.setStyle({ weight: 2.5, fillOpacity: .7 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1.5, fillOpacity: 0.4
         });
      }
    });
};

var getColor = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    console.log(value)
    if (typeof value != "undefined") {

      // condition ? if-true : if-false;
     return value == "1" ? '#e6550d' :
     		value == "2" ? '#ffeda0' :
     		value == "3" ? '#fdae6b' :
        value == "4" ? '#bfd730' :
        value == "5" ? '#bfd730' :
        value == "6" ? '#fdae6b' :
            // value >= 10.00 ? '#addd8e' :
            // value >= 0 ? '#f7fcb9' :
             
             '#f1f2f2' ;
    } else {
      return "gray"
    }
  };

  var getStroke = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    console.log(value)
    if (typeof value != "undefined") {

      // condition ? if-true : if-false;
     return value == "1" ? '1' :
        value == "2" ? '1' :
        value == "3" ? '1' :
        value == "4" ? '1' :
        value == "5" ? '2.5' :
        value == "6" ? '2.5' :
            // value >= 10.00 ? '#addd8e' :
            // value >= 0 ? '#f7fcb9' :
             
             '1' ;
    } else {
      return "1"
    }
  };

// ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: getStroke(feature.properties),
      opacity: .5,
      color: '#000',
      fillOpacity: 0.6
    };
    return s;
  }

  var geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);


 map.scrollWheelZoom.disable();
 map.setView([47.6124, -122.3381], 15);

 // map.fitBounds(geojson.getBounds())