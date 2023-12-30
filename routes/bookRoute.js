const express=require('express')

const{viewBook,singlebook,AddBook,deleteBook}=require('../controllers/bookController')
const bookRoute=express.Router()

bookRoute.get('/findbook/:id',singlebook)
bookRoute.post('/addbook',AddBook)
bookRoute.get('/viewbook',viewBook)
bookRoute.delete('/delete/:id',deleteBook)

module.exports = bookRoute;