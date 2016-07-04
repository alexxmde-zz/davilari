$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();

    var url = "/admin/produtos/novo";
    var method = "POST";
    var data = new FormData($('form')[0]);
    var loc = "/admin/produtos";

    if($('#_id').val()) {
      url = "/admin/produto/" + $('#_id').val();
      method = "PUT";
      loc = "/admin/produto/" + $('#_id').val();

      var oldImages = [];
      $('.form-product-image').each(function (index) {
         oldImages.push($(this).data("image"));
      });

      data.append("old_images", JSON.stringify(oldImages));
    }

    $.ajax({
      url: url,
      type: method,
      data: data,
      processData: false,
      contentType: false
    }).success(function(){
      window.location.href = loc;
    })
    .fail(function (data) {
      alert(data);
      $('#error').html("Erro : " + data);
    });
  ;
  });

  $(".delete-button").on("click", function (e) {
    var image = $(this).attr("data-image");
    $('.form-product-image').each(function(index) {
      if ($(this).data('image') == image) {
        $(this).remove();
      }
      
    });
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


