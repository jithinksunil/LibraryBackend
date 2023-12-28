const mongoose=require('mongoose')
const transactionSchema=new mongoose.Schema({

userId:{
    type: mongoose.Types.ObjectId,
    ref:'User'
},
BookId:{
    type: mongoose.Types.ObjectId,
    ref:'Book'
},
Duedate:{
type:Date,
},
available:{
    type:Boolean
},
})

module.exports=mongoose.model('Transaction',transactionSchema)