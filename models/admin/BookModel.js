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
    required:true
},
available:{
    type:Boolean
},
userId: {
    type:String,
    required:true
  },
category:{
    type:Array
}
})

module.exports=mongoose.model('Book',bookSchema)