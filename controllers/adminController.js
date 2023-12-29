const Admin=require('../models/admin/AdminModel');
const bcrypt=require('bcryptjs')



const Register=async(req,res,next)=>{
    try {
       const {userName,name,email,password,mobile}=req.body;
       const salt=await bcrypt.genSalt(10);
       const AdminhashPassword=await bcrypt.hashSync(password,salt)
       const AdminData=new User({userName,name,email,password:AdminhashPassword,mobile})
     const AdminDetail=await AdminData.save()
       res.status(200).json(AdminDetail)
    
    } catch (error) {
        res.status(500).json(err)
    }
    }
    
    //LOGIN TO ACCOUNT
    const Login=async(req,res,next)=>{
        try {
            const admin=await Admin.findOne({email:req.body.email})
            if(!admin){
                return res.status(404).json('user not found')
            }
            const match=await bcrypt.compare(req.body.password,admin.password)
            if(!match){
                return res.status(404).json('Wrong credentials')
            }
            const token=jwt.sign({id:admin._id},process.env.AdminSECRET,{expiresIn:'3d'})
           const{password,...info}=admin._doc
        
            res.status(200).json({admin:info,token});
    
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    
    //UPDATE ADMIN DETAILS
    const updateAdmin=async(req,res,next)=>{
    try {
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const Adminupdate=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        if (!Adminupdate) {
            return res.status(404).json('User not found');
        }
        res.status(200).json(Adminupdate)
    } catch (error) {
      res.status(500).json(error)  
    }
    }
    
    module.exports={
        Register,Login,updateAdmin
    }

