const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "Kishan@1156";

const registerUser = async(req,res)=>{
    const {userName , email, password , role} = req.body;
    console.log("**User details" , req.body);
    try {
        //  Cheacking the All valid Filds will entered or not
          //  if(!userName || !email || password || role){
          //    return res.status(400).json({msg:"Please enter all fields"});
          //  }
           const existingEmail = await User.findOne({email});
           if(existingEmail){
             return res.status(400).json({msg:"Email already exist"});
           }
           const user = new User({
              userName , email , password , role
           });
        //    creating the new User 
           const addData = await User (user);
           console.log('**add user ' , addData);
           await addData.save();
           return res.status(200).json({msg:"User Created Successfully"});
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ msg: 'Server error, user not added' });         
    }
};

const loginUser = async(req,res)=>{
    const {email , password} = req.body;
    try {
         const user = await User.findOne({email});
         if(!user){
            return res.status(400).json({msg:"Email not found"});
         }
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch){
            return res.status(400).json({msg:"Invalid Password"});
         }
         const token = jwt.sign({userId:user._id , role:user.role} , secret , {expiresIn:"1h"});
         return res.status(200).json({token, role: user.role, msg:"Login Successfull"});
    } catch (error) {
        
    }
};

const getAllUser = async(req,res)=> {
    try {
        // Fetch all users from the database
        const users = await User.find();
        res.status(200).json({
          success: true,
          message: 'Users fetched successfully',
          data: users,
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching users',
          error: error.message,
        });
      }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUser
}