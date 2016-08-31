var utils = require('../../utils');
function ContactController () {
  this.getIndex = function (req, res) {
    res.render("public/pages/contact");
  };

  this.postForm = function (req, res) {
    var data = req.body;
     var  html = " <html> " + 

    " <head>  " + 
    "   <meta charset='utf-'> " + 
    " </head>" + 

    "<body>" + 
    " <fieldset>" + 
    "  Solicitante: <b>" + data.name + "</b>" + 

    "       </fieldset>" + 

    "      <fieldset>" + 
    "       Email: <b>" + data.email + "</b>" + 

    "       </fieldset>" + 
    
    "       <fieldset>" + 
    "        Assunto: " + data.subject + 
    "     </fieldset>" + 

    "       <fieldset>" + 
    "        Telefone: " + data.phone + 
    "     </fieldset>" + 
    "    <fieldset>" + 
    "     Celular: "+ data.cellphone  + 
    "  </fieldset>" + 
 "    <fieldset>" + 
    "     Mensagem: "+ data.message  + 
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
    "     </tbody>" + 
    "  </table>" + 
    "</body>" + 

    "</html>";

     utils.sendMail(html, "Mensagem de Contato").then(function resolve() {
       res.status(200).send("OK");
     }, function reject(error) {
       res.status(500).send(error);
     });;
  return html;

    
    
  }
}

module.exports = new ContactController();
