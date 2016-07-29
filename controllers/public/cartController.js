function CartController () {
  this.post = function (req, res) {
    console.log("\nAdding item to session cart");
    
    req.session.cart = req.session.cart ||  {"items" : []};
    

    var items = req.session.cart.items;
    items.push(req.body);

    res.status(200).send("OK");

  };


  this.get = function (req, res) {

    res.render('public/pages/cart', {'cart' : req.session.cart });
  };
};

module.exports = new CartController();
