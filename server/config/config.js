const dotenv = require('dotenv');
dotenv.config();

const PORT_NUMBER = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ORIGIN = process.env.ORIGIN;
const FAST2SMS = process.env.FAST2SMS;

module.exports = {
    PORT_NUMBER,
    MONGODB_URI,
    JWT_SECRET,
    ORIGIN,
    FAST2SMS
};