const User=require('../models/user/UserModel');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken')


const userRegister = async (req, res, next) => {
    try {
       const isExisting=await User.findOne({email:req.body.email})
       if(isExisting){
           throw new Error('Already have registered')
       }
       const hashedPassword=await bcrypt.hash(req.body.password,10)
       const newUser=await User.create({...req.body,password:hashedPassword})
   
       const{password,...others}=newUser._doc;
       res.status(201).json({user:others})
     
    } catch (error) {
     return res.status(500).json(error)
    }
   };
   
   //Login user
   const userLogin = async (req, res) => {
    try {
     const user=await User.findOne({email:req.body.email})
     if(!user){
       throw new Error('Invalid credentials')
     }
     const comparePassword=await bcrypt.compare(req.body.password,user.password)
     if(!comparePassword){
       throw new Error('Invalid credentials')
     }
     const{password,...others}=user._doc;
   
     const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'5h'})
     return res.status(200).json({user:others,token})
    } catch (error) {
       return res.status(500).json(error)
    }
   };
   

module.exports={
    userRegister,userLogin
}