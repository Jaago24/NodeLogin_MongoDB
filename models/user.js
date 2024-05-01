var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const userDetails = mongoose.Schema({
    fullname: {type:String, required: true},
    email:{type:String, required:true},
    password:{type:String}
})

userDetails.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSalt(10), null)
}

module.exports = mongoose.model("User",userDetails);