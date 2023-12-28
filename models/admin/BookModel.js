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
user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
category:{
    type:Array
}
})

module.exports=mongoose.model('Book',bookSchema)