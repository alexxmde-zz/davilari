var connection = require('./connection');


connection.connect(function (err, mongoose) {
  if (err) {
    console.error(err);
    return;
  }
});

  var RUS = {type: String, unique: true, required: true};

  console.log("Conection estabilished");
  mongoose = connection.mongoose;

  function Schema() {
  this.User = mongoose.model("User",  mongoose.Schema({
    'username' : RUS,
    'password' : String 
  }));

  this.Category = mongoose.model("Category", mongoose.Schema({
    'name' : RUS
  }));

  this.Product = mongoose.model("Product", mongoose.Schema({
    'name' : RUS,
    'category' : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}

  }));
  }

module.exports = new Schema();


