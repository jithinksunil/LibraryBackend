const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('Admin',adminSchema)