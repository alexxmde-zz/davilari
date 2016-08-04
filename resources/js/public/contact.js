(function () {
  $(document).ready(function () {

function hideValidationMessages () {
  var arr = ["name", "email", "subject", "message"];
  arr.forEach(function (e) {
    var str = "#" + e + "-validation";
    $(str).attr("class", "hidden");
  });

}

function buildCartData () {
  var arr = ["name", "email", "phone", "cellphone", "message", "subject"];
  var objCart = {};
  arr.forEach(function(e) {
    var selector = "#" + e + "-input";
    var strValue = $(selector).val();
    objCart[e] = strValue;
  });

  return objCart;

}

function validateForm () {
      hideValidationMessages();
      var validate = true;

      if ($("#name-input").val() == "") {
        $("#name-validation").attr("class","visible");
        validate = false;
      }

      if ($("#email-input").val() == "") {
        $("#email-validation").attr("class","visible");
        validate = false;
      }

      if($("#subject-input").val() == "") {
        $("#subject-validation").attr("class","visible");
        validate = false;
      }

      if($("#message-input").val() == "") {
        $("#message-validation").attr("class","visible");
        validate = false;
      }


      return validate;
    }

    //Send Cart click event
    $("#btn-enviar-contato").on("click", function (e){
      if ( validateForm() ) {
        $.ajax({
          url: "/cart",
          method: "POST",
          data: buildContactData(),
          beforeSend: function () {
            $("#btn-enviar-contato").text("Enviando...");
          }

        })
        .success( function() {
          $("#btn-enviar-contato").addClass("hidden");
          $("#btn-enviado-contato").removeClass("hidden");


        }).fail(function (xhr, message) {
          console.log(xhr.statusText);
          console.log(message);
          $("#contact-validation").text("Algo deu errado. Contato o administrador através do e-mail alexandre@davilari.com.br");


        });


      }

    });




  })
}())
