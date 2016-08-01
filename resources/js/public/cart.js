(function () {
  $(document).ready(function () {

function hideValidationMessages () {
  var arr = ["name", "email", "phone", "cellphone", "table"];
  arr.forEach(function (e) {
    var str = "#" + e + "-validation";
    $(str).attr("class", "hidden");
  });

}

function buildCartData () {
  var arr = ["name", "email", "phone", "cellphone", "message"];
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

      if($("#phone-input").val() == "") {
        $("#phone-validation").attr("class","visible");
        validate = false;
      }

      if($("#cellphone-input").val() == "") {
        $("#cellphone-validation").attr("class","visible");
        validate = false;
      }

      //Check if table has rows
      if ( $("#items-table tbody tr").length == 0 ) {
        $("#table-validation").attr("class","visible")
        validate = false;
      }

      return validate;
    }

    //Remove Item click event
    $(".remove-item").on("click", function (e){
      var itemId = $(this).data("item-id");
      var line = $(this);

      $.ajax({
        url: "/cart/item/" + itemId,
        method: "DELETE"
      }).fail(function (xhr){
        $("#table-validation").text("Algo deu errado. Contate o administrador através do e-mail alexandre@davilari.com.br");

          console.log(xhr.responseText);
      }).success(function(){
        line.parent().parent().hide();
      });

    });

    //Send Cart click event
    $("#btn-send-cart").on("click", function (e){
      if ( validateForm() ) {
        $.ajax({
          url: "/cart",
          method: "POST",
          data: buildCartData(),
          beforeSend: function () {
            $("#btn-send-cart").text("Enviando");
          }

        })
        .success( function() {
          $("#btn-send-cart").addClass("hidden");
          $("#btn-sent").removeClass("hidden");


        }).fail(function (xhr, message) {
          console.log(xhr.statusText);
          console.log(message);
          $("#cart-validation").text("Algo deu errado. Contato o administrador através do e-mail alexandre@davilari.com.br");


        });


      }

    });




  })
}())
