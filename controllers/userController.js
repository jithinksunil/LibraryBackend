const User=require('../models/user/UserModel');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken')



// REGISTER NEW USER
 const Register=async(req,res,next)=>{
try {
   const {userName,name,email,password,mobile}=req.body;
   const salt=await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hashSync(password,salt)
   const newUser=new User({userName,name,email,password:hashPassword,mobile})
 const savedUser=await newUser.save()
   res.status(200).json(savedUser)

} catch (error) {
    res.status(500).json(err)
}
}

//LOGIN TO ACCOUNT
const Login=async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json('user not found')
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        if(!match){
            return res.status(404).json('Wrong credentials')
        }
        const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'3d'})
       const{password,...info}=user._doc
    
        res.status(200).json({user:info,token});

    } catch (error) {
        res.status(500).json(error)
    }
}


//UPDATE USER DETAILS
const updateprofile=async(req,res,next)=>{
try {
    if(req.body.password){
        const salt=await bcrypt.genSalt(10)
        req.body.password=await bcrypt.hashSync(req.body.password,salt)
    }
    const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    if (!updateuser) {
        return res.status(404).json('User not found');
    }
    res.status(200).json(updateuser)
} catch (error) {
  res.status(500).json(error)  
}
}

module.exports={
    Register,Login,updateprofile
}