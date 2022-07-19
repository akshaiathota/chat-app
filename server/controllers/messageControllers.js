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
        const generatedMsg = response;
        let chat = await Chat.findById(chatId);
        chat = await User.populate(chat, {
            path: 'unread.user',
            select: 'name email'
        });
        chat.latestMessage = response;
        const unread = chat.unread;
        const newUnread = [];
        unread.forEach((obj) => {
            if (obj.user._id.toString() === req.user._id.toString()) {
                newUnread.push(obj);
            }
            else {
                let newObj = {
                    user: obj.user,
                    messages: [...obj.messages, generatedMsg]
                }
                newUnread.push(newObj);
            }
        });
        chat.unread = newUnread;
        await chat.save();

        response = await response.populate('sender', 'name pic');
        response = await response.populate('chat');
        response = await User.populate(response, {
            path: 'chat.users',
            select: 'name pic email mobileNumber'
        });
        response = await User.populate(response, {
            path: 'chat.unread.user',
            select: 'name email'
        });
        response = await Chat.populate(response, {
            path: 'chat.latestMessage',
        });
        res.status(200).json({
            message: 'message sent',
            data: response
        });
    }
    catch (error) {
        console.log(error);
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
            .populate('chat', 'isGroupChat unread');
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

async function handleSeenMessage(req, res, next) {
    const { messageIds } = req.body;
    const chatId = req.params.chatId;
    try {
        const chat = await Chat.findById(chatId);
        const newObj = [];
        const set = new Set(messageIds);
        chat.unread.forEach((obj) => {
            if (obj.user._id.toString() === req.user._id.toString()) {
                if (obj.messages.length > 0) {
                    obj.messages.forEach((msg) => {
                        if (!set.has(msg.toString())) {
                            newObj.push(msg.toString());
                        }
                    });
                    obj.messages = newObj;
                }
            }
        });
        await chat.save();
        let response = await Chat.findById(chatId)
            .populate('users', '-password')
            .populate('latestMessage');
        response = await User.populate(response, {
            path: 'unread.user',
            select: 'name email'
        });
        response = await User.populate(response, {
            path: 'latestMessage.sender',
            select: 'name pic email mobileNumber'
        });
        res.status(200).json({
            message: 'messages marked as seen',
            data: response
        });
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
    allMessages,
    handleSeenMessage
}