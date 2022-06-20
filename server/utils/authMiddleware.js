const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');
const { NOT_AUTHORIZED } = require('../utils/error');

const verifyAuth = async (req, res, next) => {
    console.log('verfying auth');
    let token = null;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        }
        catch (error) {
            res.status(401).json({
                message: NOT_AUTHORIZED
            });
            return;
        }
    }
    next();
}

module.exports = verifyAuth;