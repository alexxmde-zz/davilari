let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  mainImage: String,
  destaque: Boolean,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  images: [{type: String}],
});

productSchema.virtual('IdProduct').get(function () {
    return this._id.toHexString();
})

module.exports = mongoose.model('Product', productSchema);


