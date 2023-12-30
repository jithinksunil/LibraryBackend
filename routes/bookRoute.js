const express=require('express')
const bookRoute=express.Router()
const upload = require('../utility/multer');
const{viewbook,singlebook,AddBook,deleteBook,addcategory,deletecategory,viewcategory,searchBook}=require('../controllers/bookController')


bookRoute.get('/findbook/:id',singlebook)
bookRoute.post('/addbook',upload.single('file'),AddBook)
bookRoute.get('/viewbook',viewbook)
bookRoute.delete('/delete/:id',deleteBook)
bookRoute.get('/search', searchBook);


bookRoute.post('/addcategory', upload.single('file'), addcategory);
bookRoute.get('/viewCategory',viewcategory)
bookRoute.delete('/deletecategory/:id',deletecategory)

module.exports = bookRoute;