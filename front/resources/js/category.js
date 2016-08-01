$(document).ready(function () {
  $('#category-form').on('submit', function (e) {
    e.preventDefault();

    var validateCategory= function (data) {

      var isValid = true;
      var isUpdate = false;

      if ($("#_id"))
        isUpdate = true;

      if (!data.get('name')) {
        $("#name-validation").text("Campo obrigatorio!");
        isValid = false;
      }

      if (!data.get('description')) {
        $("#description-validation").text("Campo obrigatorio!");
        isValid = false;
      }

      
      return isValid;
    };

    var url = "/admin/categoria";
    var method = "POST";
    var data = new FormData($('#category-form')[0]);
    var loc = "/admin/categorias";

    if($('#_id').val()) {
      url = "/admin/categoria/" + $('#_id').val();
      method = "PUT";
      loc = "/admin/categorias/";

         }


    if (validateCategory(data)) {

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
        console.log(data);
        $('#error').html("Erro : " + data);
      });
    } else {

    }

  });
});
