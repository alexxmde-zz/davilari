$(document).ready(function () {

  $("#acabamento-form").on('submit', function (e) {
    e.preventDefault();

    var validateAcabamento = function (data) {

      var isValid = true;
      var isUpdate = false;

      if ($("#_id").val())
        isUpdate = true;

      if(!data.get('IdTipoAcabamento') || data.get('IdTipoAcabamento') == 0) {
        $("#tipoAcabamento-validation").text("Campo obrigatorio!");
        isValid = false;
      }

      if (!data.get('nome')) {
        $("#nome-validation").text("Campo obrigatorio!");
        isValid = false;
      }

      if (!data.get('imagem')) {
        if (!isUpdate) {
          $("#imagem-validation").text("Campo obrigatorio!");
          isValid = false;
        } else {
          }
        }

        return isValid;
      };

      var url = "/admin/acabamento";
      var method = "POST";
      var data = new FormData($('#acabamento-form')[0]);
      var loc = "/admin/acabamentos";

      if($('#_id').val()) {
        url = "/admin/acabamento/" + $('#_id').val();
        method = "PUT";
        loc = "/admin/acabamento/" + $('#_id').val();

      }


      if (validateAcabamento(data)) {

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
          alert(data.responseText);
          console.log(data);
        });
      } else {

      }


    });
  });
