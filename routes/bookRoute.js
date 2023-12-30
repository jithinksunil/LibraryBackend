const express=require('express')
const {bookAdd}=require('../controllers/bookController')
const bookRoutes=express.Router()


bookRoutes.post('/addbook',bookAdd)
// userRoutes.post('/login',userLogin)
// userRoutes.put('/update/:id',updateprofile)



module.exports =  bookRoutes;