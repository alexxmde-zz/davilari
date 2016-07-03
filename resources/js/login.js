$(document).ready(function () {
  $("form").on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/admin/login",
      data: {username: $("#username").val(), password : $("#password").val()}
    })
    .done(function(data, status, xhr) {
      if (xhr.status == 200) {
        window.location.href = '/admin/produtos';
          
      }
      
    })
    .fail(function(xhr, status){
      document.getElementById("error").innerHTML = "Usuario ou senha invalidos";
    
    });
  });
});
