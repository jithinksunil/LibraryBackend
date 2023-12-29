const express=require('express')
const {Login,Register,updateAdmin }=require('../controllers/adminController') 
const adminRoutes=express.Router()

adminRoutes.post('/register',Register)
adminRoutes.post('/login',Login)

adminRoutes.put('/update/:id',updateAdmin)

module.exports = adminRoutes;