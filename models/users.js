const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let usersSchema = new Schema({
username:String,
password:String
});

module.exports = mongoose.model('User',usersSchema);
