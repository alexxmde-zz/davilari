function initMap () {
  var map = new google.maps.Map(document.getElementById("mapHere"), {
    center : { lat: -34.444, lng: 150.644 },
    scrollwheel : false,
    zoom: 8
  });
}
