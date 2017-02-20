let mongoose = require('mongoose'),
  schema = new mongoose.Schema({
  name : String,
  description : String,
  subdescription : String,
  active: Boolean,
  link: String,
  image: String
});
  schema.virtual('IdSale').get(function() {
    return this._id.toHexString();
  });

let model = mongoose.model('Sale', schema);

module.exports = model;
