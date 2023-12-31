const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(403).json({ msg: "Not authorized. No token" });

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.AdminSECRET, (err, data) => {
            if (err)
                return res.status(403).json({ msg: "Wrong or expired token" });
            else {
                req.admin = data;
                next();
            }
        });
    }
};

module.exports = verifyAdminToken;
