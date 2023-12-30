const express = require('express');
const { AdminRegister, AdminLogin } = require('../controllers/adminController');

const adminRoutes = express.Router();


adminRoutes.post('/register', AdminRegister);
adminRoutes.post('/login', AdminLogin);

module.exports = adminRoutes;





 