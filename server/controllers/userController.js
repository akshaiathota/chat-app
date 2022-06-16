const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = async(req,res)=>{
   const {name, mobileNumber,pic} = req.body;
   
   if(!name || !mobileNumber){
     res.status(400);
     throw new Error("Required Fields missing");
   }

   const userExists=await User.findOne({mobileNumber});
   if(userExists){
    res.status(400);
    throw new Error("User already exists");
   }

   const user = await User.create({
    name,
    mobileNumber,
    pic
   });

   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        mobileNumber:user.mobileNumber,
        pic:user.pic,
        token: generateToken(user._id)
    });
    }
    else{
        res.status(400);
        throw new Error("Failed to create the user");
    }
}

// const authUser = async(req,res)=>{
//     const {mobileNumber}
// }

module.exports = {registerUser};