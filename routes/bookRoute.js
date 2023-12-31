const express=require('express')
const bookRoute=express.Router()
const upload = require('../utility/multer');
const{viewbook,singlebook,viewTransaction,AdminviewTransaction,AddBook,deleteBook,addcategory,deletecategory,viewcategory,searchBook,addTransaction}=require('../controllers/bookController')
const verifyToken=require('../middleware/verifyToken.js')

bookRoute.get('/findbook/:id',singlebook)
bookRoute.post('/addbook',upload.single('file'),AddBook)
bookRoute.get('/viewbook',viewbook)
bookRoute.delete('/delete/:id', deleteBook);

bookRoute.post('/search', searchBook);


bookRoute.post('/addcategory', upload.single('file'), addcategory);
bookRoute.get('/viewCategory',viewcategory)
bookRoute.delete('/deletecategory/:id',deletecategory)

bookRoute.post('/transaction', addTransaction);
bookRoute.get('/viewtransaction',verifyToken,viewTransaction);

bookRoute.get('/AdminviewTransaction',AdminviewTransaction)
module.exports = bookRoute;