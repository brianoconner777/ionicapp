var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');



// set up a mongoose model
var UserSchema = new Schema({
  fullname: {
        type: String,
    },
  mobilenumber: {
        type: String,
        index:{unique:true}
    },
  anum: {
      type: String,
  },
  dob :{
    type:String,
  },
  preference:{
    type:String,
  },
  product:{
    type:String,
  }

});


module.exports = mongoose.model('User', UserSchema);
