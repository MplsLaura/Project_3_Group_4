// Use this link to get the GeoJSON data.
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Getting our GeoJSON data
  d3.json(link).then((data) => {
      // Creating a GeoJSON layer with the retrieved data
      L.geoJson(data, {pointToLayer:drawCircle, onEachFeature: bindPopUp2}).addTo(myMap);
  
    console.log(data);
