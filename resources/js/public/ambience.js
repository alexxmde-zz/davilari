$(document).ready(function () {
  var cSelectors = document.getElementsByClassName("c-selector");
  var cSelected = document.getElementById("c-image");
  for (var i = 0; i < cSelectors.length; i++) {
    cSelectors[i].onclick = function (e) {

      cSelected.src = e.firstElementChild.src;


    };
  } 
});
