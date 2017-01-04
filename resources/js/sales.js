$(document).ready(function () {
  $('#sale-form').on('submit', function (e) {
    e.preventDefault();

    var validateSale= function (data) {

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


      if (!data.get('image')) {
        if(!isUpdate) {
        $("#image-validation").text("Campo obrigatorio!");
        isValid = false;
        }
      }

      return isValid;
    };

    var url = "/admin/promocao";
    var method = "POST";
    var data = new FormData($('#sale-form')[0]);
    var loc = "/admin/promocoes";

    if($('#_id').val()) {
      url = "/admin/promocao/" + $('#_id').val();
      method = "PUT";
      //loc = "/admin/promocao/" + $('#_id').val();

    }


    if (validateSale(data)) {
      $('#submit-sale').prop('disabled',true);
      $("#submit-sale").text("Salvando...");
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
