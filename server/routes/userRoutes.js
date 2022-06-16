const express = require('express');
const {registerUser} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/',registerUser);
// userRouter.post('/',authUser);

module.exports = userRouter;