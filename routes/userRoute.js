const express=require('express')
const {userRegister,userLogin}=require('../controllers/userController')
const userRoutes=express.Router()


userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
// userRoutes.put('/update/:id',updateprofile)



module.exports =  userRoutes;