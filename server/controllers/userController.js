const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, SERVER_ERR, USER_NOT_FOUND } = require('../utils/error');
const { uploadImage } = require('../utils/cloudinary');

function checkCredentials(name, email, password, mobileNumber) {
    if (!name || !mobileNumber || !email || !password) {
        return false;
    }
    return isMobileNumberValid(mobileNumber);
}

function isMobileNumberValid(mobileNumber) {
    return !isNaN(mobileNumber);
}

async function userExists(email) {
    const userExists = await User.findOne({ email });
    return userExists;
}

// Creating a new user
const registerUser = async (req, res, next) => {
    const { name, email, password, mobileNumber, pic } = req.body;
    if (!checkCredentials(name, email, password, mobileNumber)) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    let url = null;
    if (!pic) {
        const imageformat = pic ? pic.type : null;
        console.log(pic);
        if (imageformat !== 'image/png' && imageformat !== 'image/jpeg' && imageformat !== 'image/jpg') {
            next({
                status: 400,
                message: INVALID_CREDENTIALS
            });
            return;
        }
        url = await uploadImage(pic.pic);
        if (!url) {
            next({
                status: 500,
                message: SERVER_ERR
            });
            return;
        }
    }
    const result = await userExists(email);
    if (result) {
        next({
            status: 400,
            message: USER_ALREADY_EXISTS
        });
        return;
    }
    let user = null;
    if (!url) {
        user = await User.create({
            name,
            email,
            password,
            mobileNumber,
        });
    }
    else {
        user = await User.create({
            name,
            email,
            password,
            mobileNumber,
            pic: url
        });
    }

    if (user) {
        const token = generateToken(user._id);
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            pic: user.pic,
            token: token
        };
        res.status(201).json({
            message: 'User created successfully',
            data: userData
        });
    }
    else {
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

//login
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        console.log(email + " " + password);
        const user = await userExists(email);
        if (!user) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        const isPasswordMatched = await user.matchPassword(password);
        if (isPasswordMatched) {
            const token = generateToken(user._id);
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                pic: user.pic,
                token: token
            };
            res.status(201).json({
                message: 'Sign in successful!!!',
                data: userData
            });
            return;
        }
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
};