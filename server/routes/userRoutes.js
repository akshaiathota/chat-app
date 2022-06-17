const express = require('express');
const { registerUser, loginUser, verifyOtp } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', loginUser);
userRouter.post('/signup', registerUser);
userRouter.post('/verifyOtp', verifyOtp);

module.exports = userRouter;