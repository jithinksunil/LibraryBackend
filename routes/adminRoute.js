const express = require('express');
const { AdminRegister,userview, AdminLogin } = require('../controllers/adminController');

const adminRoutes = express.Router();


adminRoutes.post('/register', AdminRegister);
adminRoutes.post('/login', AdminLogin);
adminRoutes.get('/userview', userview);
module.exports = adminRoutes;





 