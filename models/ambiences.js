const mongoose = require('mongoose');
      Schema = mongoose.Schema;

let ambSchema = new Schema({
  name: String,
  description: String,
  mainImage: String,
  featured: Boolean,
  images: [{type: String}]
})

ambSchema.virtual('IdAmbience').get(function () {
  return this._id.toHexString();
})

module.exports = mongoose.model('Ambience', ambSchema);
