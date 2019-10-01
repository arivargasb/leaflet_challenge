var myMap = L.map("map", {
    center: [17, -4 ],
    zoom: 2
  }); 
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYXJpdmFyZ2FzYiIsImEiOiJjazByYm16ajIwNG1kM25zN2M4dDRmNGQyIn0.Ya-5ppfCOpgBtfNonUAhCQ"    
  }).addTo(myMap);
  

// Significant Earthquakes - Past 7 Days
  var json = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  
  function getColor(magnitude) {
    return      magnitude >= 6.5  ? '#e23b1b':
    magnitude >= 6  ? '#e77a2f' :    
    magnitude >= 5.5  ? '#e39e1a' :
    magnitude >=5  ? '#ecbb5d':
     '#e7d62f';   
} 

//   var array = [];

  d3.json(json, function(data) {
  var earth=data.features;
  for (var i = 0; i < earth.length; i++) {
    var location = [earth[i].geometry.coordinates[1],earth[i].geometry.coordinates[0]]

    var geojson;
    geojson = L.circle(location, {
            fillOpacity: 0.75,
            mag: earth[i].properties.mag,
            color: getColor(earth[i].properties.mag),
            fillColor: getColor(earth[i].properties.mag),
            // Adjust radius
            radius: Math.round(earth[i].properties.mag*150000)
          }).bindPopup("<h2>Location: " + earth[i].properties.place + "</h1> <hr> <h3>Magnitude: " +earth[i].properties.mag + "</h3>").addTo(myMap);
        //   console.log(getColor(earth[i].properties.mag), earth[i].properties.mag, Math.round(earth[i].properties.mag*150000));
        };

});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		magnitude = [0, 5, 5.5, 6, 6.5],
		labels = [];

	// loop through our magnitude intervals and generate a label with a colored square for each interval
	for (var i = 0; i < magnitude.length; i++) {
		div.innerHTML +=
			'<i style="background:' + getColor(magnitude[i]) + '"></i> ' +
			magnitude[i] + (magnitude[i + 1] ? '-' + (magnitude[i + 1]-.1) + '<br>' : '+');
	}

	return div;
};

legend.addTo(myMap);