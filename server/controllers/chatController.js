const { INVALID_CREDENTIALS, SERVER_ERR, USER_ALREADY_EXISTS } = require("../utils/error");
const Chat = require('../models/chatModel');
const User = require("../models/userModel");

async function accessChats(req, res, next) {
    const { userId } = req.body;
    if (!userId) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password')
        .populate('latestMessage');
    isChat = await User.populate(isChat, {
        path: 'unread.user',
        select: 'name email'
    });
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email mobileNumber'
    });
    if (isChat.length > 0) {
        res.status(200).json({
            data: isChat[0],
            message: 'chat access successful'
        });
        return;
    }
    else {
        let chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
            unread: [{
                user: req.user._id,
            }, {
                user: userId
            }]
        };
        try {
            const newChat = await Chat.create(chatData);
            let chat = await Chat.findOne({ _id: newChat._id }).populate(
                'users',
                '-password'
            );
            chat = await User.populate(chat, {
                path: 'unread.user',
                select: 'name email'
            });
            res.status(200).json({
                data: chat,
                message: 'chat access successful'
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
}

async function fetchChats(req, res, next) {
    try {
        let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });
        chats = await User.populate(chats, {
            path: 'unread.user',
            select: 'name email'
        });
        chats = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name pic email mobileNumber'
        });
        res.status(200).json({
            message: 'fetched chats successfully',
            data: chats
        });
        return;
    }
    catch (error) {
        next({
            message: SERVER_ERR,
            status: 500
        });
        return;
    }
}

async function createGroupChat(req, res, next) {
    const { name, users } = req.body;
    if (!name || !users) {
        next({
            status: 'error',
            message: INVALID_CREDENTIALS
        });
        return;
    }
    let inputUsers = JSON.parse(users);
    if (inputUsers.length < 2) {
        next({
            status: 'error',
            message: 'Requires more than 2 people to form group'
        });
        return;
    }
    inputUsers.push(req.user);
    let unread = [];
    inputUsers.forEach((usr) => {
        unread.push({
            user: usr._id
        });
    });
    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: inputUsers,
            isGroupChat: true,
            groupAdmin: req.user,
            unread: unread
        });
        let fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        fullGroupChat = await User.populate(fullGroupChat, {
            path: 'unread.user',
            select: 'name email'
        });
        res.status(200).json({
            message: 'group chat fetched successfully',
            data: fullGroupChat
        });
        return;
    }
    catch (error) {
        next({
            message: SERVER_ERR,
            status: 500
        });
        return;
    }
}

async function renameGroup(req, res, next) {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        next({
            message: INVALID_CREDENTIALS,
            status: 400
        });
        return;
    }
    try {
        let chat = await Chat.findByIdAndUpdate(chatId, {
            chatName: chatName
        }, {
            new: true
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
        chat = await User.populate(chat, {
            path: 'unread.user',
            select: 'name email'
        });
        if (!chat) {
            next({
                message: 'chat not found',
                status: 500
            });
            return;
        }
        else {
            res.status(200).json({
                data: chat,
                message: 'group name changed successfully'
            });
        }
        return;
    }
    catch (error) {
        next({
            message: SERVER_ERR,
            status: 500
        });
        return;
    }
}

async function addToGroup(req, res, next) {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        next({
            message: INVALID_CREDENTIALS,
            status: 400
        });
        return;
    }
    try {
        const doesChatExist = await Chat.findById(chatId).find({ users: { $elemMatch: { $eq: userId } } });
        if (doesChatExist.length > 0) {
            next({
                status: 400,
                message: USER_ALREADY_EXISTS
            });
            return;
        }
        let updation = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId }
        }, {
            new: true
        });
        const newUsr = {
            user: userId
        }
        updation = await Chat.findByIdAndUpdate(chatId, {
            $push: { user: newUsr }
        }).populate('users', '-password')
            .populate('groupAdmin', '-password');
        updation = await User.populate(chatId, {
            path: 'unread.user',
            select: 'name email'
        });
        console.log(updation);
        res.status(200).json({
            message: 'user added to group',
            data: updation
        });
        return;
    }
    catch (error) {
        next({
            message: SERVER_ERR,
            status: 500
        });
        return;
    }
}

async function removeFromGroup(req, res, next) {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        next({
            message: INVALID_CREDENTIALS,
            status: 400
        });
        return;
    }
    try {
        let deletion = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId }
        }, {
            new: true
        });
        const newUsr = {
            user: userId
        }
        deletion = await Chat.findByIdAndUpdate(chatId, {
            $pull: { user: newUsr }
        }).populate('users', '-password')
            .populate('groupAdmin', '-password');
        deletion = await User.populate(chatId, {
            path: 'unread.user',
            select: 'name email'
        });
        res.status(200).json({
            message: 'user removed from group',
            data: deletion
        });
        return;
    }
    catch (error) {
        next({
            message: SERVER_ERR,
            status: 500
        });
        return;
    }
}


module.exports = {
    accessChats,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}