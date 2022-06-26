const axios = require('axios');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const { INVALID_CREDENTIALS, SERVER_ERR } = require('../utils/error');

async function sendMessage(req, res, next) {
    const { message, chatId } = req.body;
    if (!message || !chatId) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    let newMessage = {
        sender: req.user._id,
        content: message,
        chat: chatId
    };
    try {
        let response = await Message.create(newMessage);
        response = await response.populate('sender', 'name pic');
        response = await response.populate('chat');
        response = await User.populate(response, {
            path: 'chat.users',
            select: 'name pic email mobileNumber'
        });
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: response
        });
        res.status(200).json({
            message: 'message sent',
            data: response
        });
    }
    catch (error) {
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function allMessages(req, res, next) {
    const chatId = req.params.chatId;
    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name pic email mobileNumber')
            .populate('chat');
        res.status(200).json({
            message: 'fetched all chats',
            data: messages
        });
        return;
    }
    catch (error) {
        next({
            status: 500,
            message: SERVER_ERR
        });
    }
}

module.exports = {
    sendMessage,
    allMessages
}