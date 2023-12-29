const express=require('express')
 const {AdminRegister,AdminLogin,logoutAdmin}=require('../controllers/adminController') 
const adminRoutes=express.Router()

 adminRoutes.post('/register',AdminRegister)
 adminRoutes.post('/login',AdminLogin)

 adminRoutes.get('/logout',logoutAdmin)

module.exports = adminRoutes;