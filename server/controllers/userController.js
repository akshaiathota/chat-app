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

async function userExists(credential) {
    const userExists = await User.findOne(credential);
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
    const emailExists = await userExists({ email: email });
    const mobileNumberExists = await userExists({ mobileNumber: mobileNumber });
    if (emailExists || mobileNumberExists) {
        next({
            status: 400,
            message: USER_ALREADY_EXISTS
        });
        return;
    }
    let url = null;
    if (pic.pic) {
        const imageformat = pic ? pic.type : null;
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
        const user = await userExists({ email: email });
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

async function findUser(req, res) {
    const searchString = req.query.search;
    const users = await User.findOne({ mobileNumber: searchString }).find({ _id: { $ne: req.user._id } });
    res.status(201).json({
        data: users,
        message: 'data fetched successfully'
    });
    return;
}

async function findUserByName(req, res) {
    const conditions = req.query.search
        ?
        { name: { $regex: req.query.search, $options: "i" } }
        : {};
    const users = await User.find(conditions).find({ _id: { $ne: req.user._id } });
    res.status(201).json({
        data: users,
        message: 'data fetched successfully'
    });
    return;
}

module.exports = {
    registerUser,
    loginUser,
    findUser,
    findUserByName
};