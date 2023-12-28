const mongoose=require('mongoose')
const eventSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
desc:{
type:String,
required:true
},
date:{
    type:Date,
    required:true
}
})

module.exports=mongoose.model('Event',eventSchema)