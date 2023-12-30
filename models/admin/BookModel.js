const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
author:{
type:String,
},
image:{
    type:String,
   
},
available:{
    type:String
},
category:{
    type:String
}
})

module.exports=mongoose.model('Book',bookSchema)