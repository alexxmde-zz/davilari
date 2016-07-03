$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();

    var url = "/admin/produtos/novo";
    var method = "POST";

    $.ajax({
      url: url,
      type: method,
      data: new FormData($('form')[0]),
      processData: false,
      contentType: false
    }).success(function(){
     window.location.href = "/admin/produtos";
    })
    .fail(function (data) {
      alert(data);
      $('#error').html("Erro : " + data);
    });
    ;
  });
});


$("#imageModal").on("show.bs.modal", function (e) {
  var button = $(e.relatedTarget);
  var imageTitle = button.data('image');

  var modal = $(this);
 // modal.find('.imageTitle').text(imageTitle);
 $('.delete-button').attr('data-image', imageTitle);
 $('.img-modal').attr('src', '/resources/img/products/' + imageTitle);


});
