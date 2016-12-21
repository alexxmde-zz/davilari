const mongoose = require('mongoose');
      Schema = mongoose.Schema;

let categoriesSchema = new Schema({
  name: String,
  description: String,
});

categoriesSchema.virtual('IdCategory').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Category', categoriesSchema);
