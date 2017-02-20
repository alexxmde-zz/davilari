const mongoose = require('mongoose');
      Schema = mongoose.Schema;

let schema = new Schema({
  nome: String,
  acabamentos: [{type: Schema.Types.ObjectId, ref:'Acabamento'}],
});

schema.virtual('IdTipoAcabamento').get(function() {
  return this._id.toHexString();
})

module.exports = mongoose.model('TipoAcabamento', schema);
