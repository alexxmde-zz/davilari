function initMap () {
  var myLatLng = {lat:-23.617468 ,lng:-46.6623724 };
  var map = new google.maps.Map(document.getElementById("mapHere"), {
    center: myLatLng,
    scrollwheel : false,
    zoom: 17 
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Loja"
  });
}
