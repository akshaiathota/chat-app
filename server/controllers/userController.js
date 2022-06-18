const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, SERVER_ERR, USER_NOT_FOUND, INCORRECT_OTP } = require('../utils/error');
const { generateOtp, sendMessage } = require('../utils/otp');

// Creating a new user

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

const registerUser = async (req, res, next) => {
    const { name, email, password, mobileNumber, pic } = req.body;
    if (!checkCredentials(name, email, password, mobileNumber)) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    const result = await userExists(email);
    //console.log(result);
    if (result) {
        next({
            status: 400,
            message: USER_ALREADY_EXISTS
        });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        mobileNumber,
        pic
    });

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

// //verify Otp 
// async function verifyOtp(req, res, next) {
//     try {
//         const { otp, userId } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             next({
//                 status: 400,
//                 message: USER_NOT_FOUND
//             });
//             return;
//         }

//         if (user.otp !== otp) {
//             next({
//                 status: 400,
//                 message: INCORRECT_OTP
//             });
//             return;
//         }
//         const token = generateToken(userId);
//         user.otp = '';
//         await user.save();

//         res.status(201).json({
//             type: 'success',
//             message: 'Otp verified successfully',
//             data: {
//                 token,
//                 userId: user._id,
//             }
//         });
//     }
//     catch (error) {
//         next(error);
//     }
// }


module.exports = {
    registerUser,
    loginUser,
    // verifyOtp
};