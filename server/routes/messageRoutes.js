const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageControllers');
const verifyAuth = require('../utils/authMiddleware');

const messageRouter = express.Router();

messageRouter.route('/').post(verifyAuth, sendMessage);
messageRouter.route('/:chatId').get(verifyAuth, allMessages);


module.exports = messageRouter;