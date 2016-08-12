$(document).ready(function() {
  $("#ambience-form").on("submit", function (e) {
    e.preventDefault();


    function validateForm(data) {
      var isValid = true;
      var isUpdate = false;

      if ($("#_id").val())
        isUpdate = true;

      if (!data.get('name')) {
        $("#name-validation").text("Campo obrigatorio!");
        isValid = false;
      }

      if (!data.get('description')) {
        $("#description-validation").text("Campo obrigatorio!");
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

    }

    var url = "/admin/ambiente";
    var method = "POST";
    var loc = "/admin/ambientes";
    var form = document.getElementById("ambience-form");
    var formData = new FormData(form);
    if($('#_id').val()) {
      url = "/admin/ambiente/" + $('#_id').val();
      method = "PUT";
      loc = "/admin/ambiente/" + $('#_id').val();

      var oldImages = [];
      $('.form-ambience-image').each(function (index) {
        oldImages.push($(this).data("image"));
      });

      formData.append("old_images", JSON.stringify(oldImages));

    }

    
    if (validateForm(formData)) {
      $.ajax({
        url: url,
        method: method,
        data: formData,
        contentType: false,
        processData : false
      })
      .success( function Success(response) {
        window.location.href = loc;

      })
      .fail(function Failure (xhr, message) {
        $("#error-message").text(xhr.responseText + ": " + message);
      });
      

    }
    
  });

  $(".delete-button").on("click", function (e) {
    var image = $(this).attr("data-image");
    $('.form-ambience-image').each(function(index) {
      if ($(this).data('image') == image) {
        $(this).remove();
      }

    });
  });


$("#AmbienceImageModal").on("show.bs.modal", function (e) {
  var button = $(e.relatedTarget);
  var imageTitle = button.data('image');

  var modal = $(this);
  // modal.find('.imageTitle').text(imageTitle);
  $('.delete-button').attr('data-image', imageTitle);
  $('.ambience-img-modal').attr('src', '/resources/img/ambiences/' + imageTitle);


});


});
