let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

acabamentoSchema = new Schema({
  nome: String,
  tipo: {type: Schema.Types.ObjectId, ref:'TipoAcabamento'},
  disponivel: Boolean,
  imagem: String
});

acabamentoSchema.virtual('IdAcabamento').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Acabamento', acabamentoSchema);
