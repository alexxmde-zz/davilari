$(document).ready(function() {
  $("#btn-tipoAcabamento").on("click", function () {
    var tipoAcabamento = $("#input-tipoAcabamento").val();
    var idAcabamento  = $('#idTipoAcabamento').val();

    var url = '/admin/tipo_acabamento',
      method = 'POST',
      data = {'tipoAcabamento' : tipoAcabamento};

    if (idAcabamento) {
      url = "/admin/tipo_acabamento/" + idAcabamento;
      method = "PUT";
      
    }

    if (tipoAcabamento) {
      $.ajax({
        'url' : url,
        'method' : method,
        'data' : data
      }).success(function () {
        $("#btn-tipoAcabamento-success").removeClass("hidden");
        $("#btn-tipoAcabamento").addClass("hidden");
        setInterval(function () {window.location.href = '/admin/tipos_acabamento'},
          1500);
      }).fail(function (xhr) {
        $("#message-tipoAcabamento").text(xhr.responseText);
      });

    } else { $("#validate-tipoAcabamento").text("Campo obrigatório");
    }
  });

  $("#TipoAcabamentoModal").on("show.bs.modal", function (event) {
    $("#input-tipoAcabamento").val("");
    $("#mensagem-tipoAcabamento").text("");
    $("#btn-tipoAcabamento").removeClass("hidden");
    $("#btn-tipoAcabamento-success").addClass("hidden");

    var button = $(event.relatedTarget);
    var idAcabamento = button.data('id') || null;
    var tipoAcabamento = button.data('tipoacabamento') || null;

    if (idAcabamento) {
      $("#idTipoAcabamento").val(idAcabamento);
      $("#input-tipoAcabament").val(tipoAcabamento);
    }
    else {
      $("#idTipoAcabamento").val("");
    }

    if (tipoAcabamento)
      $("#input-tipoAcabamento").val(tipoAcabamento);



  });
});
