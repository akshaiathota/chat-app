const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { INVALID_CREDENTIALS, PHONE_NUM_ALREADY_EXISTS, SERVER_ERR, PHONE_NUM_NOT_FOUND, USER_NOT_FOUND, INCORRECT_OTP } = require('../utils/error');
const { generateOtp, sendMessage } = require('../utils/otp');

// Creating a new user

function checkCredentials(name, mobileNumber) {
    if (!name || !mobileNumber) {
        return false;
    }
    return isMobileNumberValid(mobileNumber);
}

function isMobileNumberValid(mobileNumber) {
    return !isNaN(mobileNumber);
}

async function userExists(mobileNumber) {
    const userExists = await User.findOne({ mobileNumber });
    return userExists;
}

const registerUser = async (req, res, next) => {
    const { name, mobileNumber, pic } = req.body;
    if (!checkCredentials(name, mobileNumber)) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    const result = await userExists(mobileNumber);
    console.log(result);
    if (result) {
        next({
            status: 400,
            message: PHONE_NUM_ALREADY_EXISTS
        });
        return;
    }

    const user = await User.create({
        name,
        mobileNumber,
        pic
    });

    if (user) {
        const userData = {
            _id: user._id,
            name: user.name,
            mobileNumber: user.mobileNumber,
            pic: user.pic,
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
        const { mobileNumber } = req.body;
        if (!isMobileNumberValid(mobileNumber)) {
            next({
                status: 400,
                message: INVALID_CREDENTIALS
            });
            return;
        }
        const user = await userExists(mobileNumber);
        if (!user) {
            next({
                status: 400,
                message: PHONE_NUM_NOT_FOUND
            });
            return;
        }

        user.otp = generateOtp(8);
        await user.save();
        const result = await sendMessage({
            message: `Your otp is ${user.otp}`,
            contactNumber: user.mobileNumber
        }, next);
        res.status(201).json({
            type: 'success',
            message: 'OTP sent your mobile number'
        });
    }
    catch (error) {
        next(error)
    }
}

//verify Otp 
async function verifyOtp(req, res, next) {
    try {
        const { otp, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }

        if (user.otp !== otp) {
            next({
                status: 400,
                message: INCORRECT_OTP
            });
            return;
        }
        const token = generateToken(userId);
        user.otp = '';
        await user.save();

        res.status(201).json({
            type: 'success',
            message: 'Otp verified successfully',
            data: {
                token,
                userId: user._id,
            }
        });
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    registerUser,
    loginUser,
    verifyOtp
};