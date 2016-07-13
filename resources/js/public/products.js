$(document).ready(function() {


  $(".productSelect select").change(function() {
    var selected = $(this).val();
    console.log($(this));
    window.location = "/produtos?categoria=" + selected;
  });
});
