const express = require('express');
const { AdminRegister,userview, AdminLogin } = require('../controllers/adminController');
const verifyadminToken=require('../middleware/verifyadminToken')
const adminRoutes = express.Router();


adminRoutes.post('/register', AdminRegister);
adminRoutes.post('/login', AdminLogin);
adminRoutes.get('/userview', verifyadminToken,userview);
module.exports = adminRoutes;





 