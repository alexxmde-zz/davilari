$(document).ready(function () {
  $('#product-form').on('submit', function (e) {
    e.preventDefault();

    var validateProduct = function (data) {

      var isValid = true;
      var isUpdate = false;

      if ($("#_id"))
        isUpdate = true;

      if (!data.get('name')) {
        $("#name-validation").text("Campo obrigatorio!");
        isValid = false;
      }


      if (!data.get('mainImage')) {
        if (!isUpdate) {
          $("#mainImage-validation").text("Campo obrigatorio!");
          isValid = false;
        } else {
          if(!$("#mainImage").data("image")) {
            $("#mainImage-validation").text("Campo obrigatorio!");
            isValid = false;
          }
        }
      }

      if (!data.get('images')) {
        if (!isUpdate) {
          $("#images-validation").text("Campo obrigatorio!");
          isValid = false;
        }
      }

      return isValid;
    };

    var url = "/admin/produtos/novo";
    var method = "POST";
    var data = new FormData($('#product-form')[0]);
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


    if (validateProduct(data)) {
console.log("Sending ajax");
      $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false
      }).success(function(){
              console.log("Success");
               window.location.href = loc;
      })
      .fail(function (xhr, type, error) {
        alert(xhr.responseText);
        $('#error').html("Erro : " + xhr.responseText);
      });
    } else {

    }

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

$('#btn-excluir').on('click', function(e) {

  var locArr = window.location.href.split('/');
  var id = locArr[locArr.length-1];
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE','/admin/produto/' + id);
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Produto excluido!");
      window.location = '/admin/produtos';
    } else {
      alert(xhr.responseText);
    }
  }

  xhr.send();

});


