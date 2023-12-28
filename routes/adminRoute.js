const express=require('express')
import {Register }from '../controllers/adminController'
const adminRoute=express.Router()


adminRoute.post('/',Register)




export default adminRoute;