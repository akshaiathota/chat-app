const fast2sms = require('fast-two-sms');
const { FAST2SMS } = require('../config/config');

function generateOtp(length) {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

async function sendMessage({ message, contactNumber }, next) {
    try {
        const res = await fast2sms.sendMessage({
            authorization: FAST2SMS,
            message,
            numbers: [contactNumber],
        });
        console.log(res);
    }
    catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    generateOtp,
    sendMessage
}