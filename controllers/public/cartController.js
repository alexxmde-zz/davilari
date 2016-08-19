var utils = require('../../utils');
var productDAO = require('../../models/data/mysql/productDAO');

var buildHtml = function (data) {
  var cart = data.cart;
  var sender = data.sender;
  var html = "";
  var tableLines = "";
  cart.forEach(function (c) {
    tableLines += 
      "    <tr>" + 
      "     <td style='border-bottom:1px solid black;'>" + c.name + "</td>" + 

      "             <td style='border-bottom:1px solid black;'>" + c.quantity + "</td>" + 

      "            <td style='border-bottom:1px solid black;'>R$" + c.price +",00</td>" + 

      "           <td style='border-bottom:1px solid black'>R$" + (c.quantity * c.price) + ",00</td>" + 
      "        </tr>";


  });

  html = " <html> " + 

    " <head>  " + 
    "   <meta charset='utf-'> " + 
    " </head>" + 

    "<body>" + 
    " <fieldset>" + 
    "  Solicitante: <b>" + sender.name + "</b>" + 

    "       </fieldset>" + 

    "      <fieldset>" + 
    "       Email: <b>" + sender.email + "</b>" + 

    "       </fieldset>" + 

    "       <fieldset>" + 
    "        Telefone: " + sender.phone + 
    "     </fieldset>" + 
    "    <fieldset>" + 
    "     Celular: "+ sender.cellphone  + 
    "  </fieldset>" + 
 "    <fieldset>" + 
    "     Mensagem: "+ sender.message  + 
    "  </fieldset>" + 
    " <br />" + 
    "<br />" + 
    "<h2>Orçamento Solicitado</h2>" + 
    "<table>" + 
    "  <thead>" + 
    "   <tr>" + 
    "    <th>Produto</th>" + 
    "   <th>Quantidade</th>" + 
    "  <th>Preço</th>" + 
    " <th>Total</th>" + 
    "  </tr>" + 
    "    </thead>" + 
    "   <tbody style='text-align:center'>" + tableLines + 
    "     </tbody>" + 
    "  </table>" + 
    "</body>" + 

    "</html>";
  return html;

};
function CartController () {

  this.postItem = function (req, res) {
    console.log("\nAdding item to session cart");

    req.session.cart = req.session.cart ||  {"items" : []};

    var items = req.session.cart.items;
    items.push(req.body);

    res.status(200).send("OK");

  };

  this.deleteItem = function (req, res) {
    try {

      var id = req.params.id;
      var items = req.session.cart.items;
      console.log("Deleting item: " + id + " from cart");
      for(var i = 0; i <= items.length -1; i++) {
        if(items[i]) {
          console.log(items[i]);
          if (items[i].id == id) {
            console.log("deleting...");
            delete items[i];
          }
        }
      }
      req.session.cart.items = items;


      if(!req.session.cart.items || !req.session.cart.items == []) {
        delete req.session.cart;
      }


      return res.status(200).send();

    } catch (e) {
      console.error(e.message);
      return res.status(500).send(e.message);
    }


  };

  this.postCart = function (req, res) {
    var data = { 
      "sender" : req.body,
      "cart" : req.session.cart.items

    };


    utils.sendMail(buildHtml(data)).then(function success() {
      return res.status(200).send("OK");
    }, function failure(error) {
      console.error(error);
      return res.status(500).send(error);
    });

  };


  this.getCart = function (req, res) {
    productDAO.buscarDestaques(function (err, destaques) {
      if (err) {
        res.send(err);
      } else {

        res.render('public/pages/cart', {'cart' : req.session.cart, 'products' : destaques });
      }

    }); 

  };


};

module.exports = new CartController();
