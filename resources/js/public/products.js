jQuery.fn.ForceNumericOnly =
  function()
{
  return this.each(function()
      {
        $(this).keydown(function(e)
            {
              var key = e.charCode || e.keyCode || 0;
              // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
              // home, end, period, and numpad decimal
              return (
                  key == 8 || 
                  key == 9 ||
                  key == 13 ||
                  key == 46 ||
                  key == 110 ||
                  key == 190 ||
                  (key >= 35 && key <= 40) ||
                  (key >= 48 && key <= 57) ||
                  (key >= 96 && key <= 105));
            });
            
      });
};


              function CartEvents () {
                var buildCartItemData = function (e) {
                  try {
                  var objCartItem = {};
                  objCartItem.id = $(e.target).data("id");
                  objCartItem.name = $(e.target).data("name");
                  objCartItem.price = $(e.target).data("price");
                  objCartItem.quantity= $("#quantity-field").val();

                  return objCartItem;
                  } catch (err) {
                    console.log(err.message);
                  }
                };

                $("#quantity-field").ForceNumericOnly();

                $("#btn-post-item").on('click', function (e) {
                  $("#btn-post-item").text("Adicionando...");
                  $.ajax({
                    method: "POST",
                    url: "/cart/item",
                    data: buildCartItemData(e)
                    
                  })
                  .done(function (msg) {
                    setInterval(function () {
                    $("#btn-post-item").addClass("hidden");
                    $("#btn-posted-item").removeClass("hidden");
                    $("#linkParaOrcamento").removeClass("hidden");
                    $("#linkParaProdutos").removeClass("hidden");
                    }, 1000);
                  })
                  .fail(function (jqXHR, textStatus) {
                    console.log("Request failed: " + jqXHR.responseText);
                  });
                  

                  $("#imageModal").on("show.bs.modal", function (e) {
                    var button = $(e.relatedTarget);
                    var imageTitle = button.data('product-name');

                    var modal = $(this);
                    // modal.find('.imageTitle').text(imageTitle);
                    $('.delete-button').attr('data-image', imageTitle);
                    $('.img-modal').attr('src', '/resources/img/products/' + imageTitle);

                  });

                });


                $("#add-orcamento").on('click', function (e) {
                });

              }

              $(document).ready(function() {
                CartEvents();

                $(".productSelect select").change(function() {
                  var selected = $(this).val();
                  console.log($(this));
                  window.location = "/produtos?categoria=" + selected+"#query";
                });
              });


              $(".panel-side-image").on('click', function (e) {
                var newSrc = $(this).attr('src');

                $("#displayed-image").attr('src', newSrc);
              })



              $('#image-carousel').carousel({
                interval: false
              });

              $('#amb-carousel').carousel({
                interval: false
              }); 

