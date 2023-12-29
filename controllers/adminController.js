
const Admin = require("../models/admin/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register admin
const AdminRegister = async (req, res, next) => {
  try {
    const { userName, name, email, password, mobile } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newAdmin = new Admin({ userName, name, email, password, mobile });
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Login admin
const AdminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email:req.body.email });

    if (!admin) {
      return res.status(404).json('Admin is not found');
    }

    const match = await bcrypt.compare(req.body.password,admin.password);

    // if (!match) {
    //   return res.status(401).json('Invalid credentials');
    // }

    const token = jwt.sign({ id:admin._id }, process.env.AdminSECRET,{ expiresIn: '3d' });
    const { password, ...info } = admin._doc;

    res.cookie('token', token).status(200).json(info);

  } catch (error) {
    return res.status(500).json(error);
  }
};

//Logout
const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie('token', { sameSite: 'none', secure: true }).status(200).send('User logout success');
  } catch (error) {
    res.status(500).json(error);
  }
};



module.exports={
    AdminRegister,AdminLogin,logoutAdmin
}