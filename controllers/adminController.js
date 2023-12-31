
const Admin = require("../models/admin/AdminModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER ADMIN
const AdminRegister = async (req, res, next) => {
  console.log(req.body)
 try {
    const isExisting=await Admin.findOne({email:req.body.email})
    if(isExisting){
      return res.status(404).json({msg:'email already taken'})
    }
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    const newAdmin=await Admin.create({...req.body,password:hashedPassword})
    console.log(newAdmin)

    const{password,...others}=newAdmin._doc;
    res.status(201).json({admin:others})
  
 } catch (error) {
  return res.status(500).json(error)
 }
};

//LOGIN ADMIN
const AdminLogin = async (req, res) => {
 try {
  const admin=await Admin.findOne({email:req.body.email})
  if(!admin){
    return res.status(404).json({msg:'Invalid credentials'})
  }
  const comparePassword=await bcrypt.compare(req.body.password,admin.password)
  if(!comparePassword){
    return res.status(404).json({msg:'Invalid credentials'})
  }
  const{password,...others}=admin._doc;

  const token=jwt.sign({id:admin._id},process.env.AdminSECRET,{expiresIn:'5h'})

  return res.status(200).json({admin:others,token})
 } catch (error) {
    return res.status(500).json(error)
 }
};




module.exports={
    AdminRegister,AdminLogin
}