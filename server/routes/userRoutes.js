const express = require('express');
const { registerUser, loginUser, findUser, findUserByName } = require('../controllers/userController');
const verifyAuth = require('../utils/authMiddleware');

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(verifyAuth, findUser);
userRouter.route('/name').get(verifyAuth, findUserByName);
userRouter.post('/login', loginUser);

module.exports = userRouter;