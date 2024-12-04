const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   userName : {
    type: String , 
    required : true
   },
   email:{
    type:String, 
     required:true,
     unique:true,   
   },
   password:{
      type:String,
      required:true,
      unique:true
   },
   role:{
      type:String,
      required:true,
      enum:['Admin', 'author', 'reader'],
      default:'reader'
   }
});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User', userSchema);