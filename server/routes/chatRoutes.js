const express = require('express');
const { accessChats, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');
const verifyAuth = require('../utils/authMiddleware');

const chatRouter = express.Router();

chatRouter.route('/').post(verifyAuth, accessChats);
chatRouter.route('/').get(verifyAuth, fetchChats);
chatRouter.route('/group').post(verifyAuth, createGroupChat);
chatRouter.route('/rename').put(verifyAuth, renameGroup);
chatRouter.route('/groupadd').put(verifyAuth, addToGroup);
chatRouter.route('/groupremove').put(verifyAuth, removeFromGroup);

module.exports = chatRouter;