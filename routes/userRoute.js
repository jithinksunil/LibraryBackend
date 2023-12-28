const express=require('express')
import {Register }from '../controllers/userController'
const userRoute=express.Router()


userRoute.post('/',Register)




export default userRoute;