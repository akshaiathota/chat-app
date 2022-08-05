import axios from 'axios';

const BASE_URI = '/api/';
const INVALID_DATA = {
    status: 'error',
    message: 'missing or invalid data'
};

function areRegisterInputsValid({ email, password, confirmPassword, mobileNumber }) {
    if (!email || !password || !confirmPassword || !mobileNumber) {
        return false;
    }
    return true;
}

function areLoginInputsValid({ email, password }) {
    if (!email || !password) {
        return false;
    }
    return true;
}

function isPasswordValid(password, confirmPassword) {
    return password === confirmPassword;
}

async function serverRequest(url, method, data, headers) {
    try {
        const response = await axios({
            url,
            method,
            data,
            headers
        });
        const responseData = {
            status: 'ok',
            data: response.data.data,
            message: response.data.message
        }
        return responseData;
    }
    catch (error) {
        console.log(error);
        if (error.response.data) {
            const { message } = error.response.data;
            const responseData = {
                status: 'error',
                message: message
            }
            return responseData;
        }
        return {
            status: 'error',
            message: 'connection error'
        };
    }
}

export const registerUser = async (inputData) => {
    const { password, confirmPassword } = inputData;
    const inputsValidity = areRegisterInputsValid(inputData);
    const passwordMatch = isPasswordValid(password, confirmPassword);
    if (!inputsValidity || !passwordMatch) {
        return INVALID_DATA;
    }
    const url = BASE_URI + 'user';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const loginUser = async (inputData) => {
    const inputsValidity = areLoginInputsValid(inputData);
    if (!inputsValidity) {
        return INVALID_DATA;
    }
    const method = 'POST';
    const url = BASE_URI + 'user/login';
    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const searchUser = async (search, token) => {
    if (!search) {
        return INVALID_DATA;
    }
    const method = 'GET';
    const url = BASE_URI + `user?search=${search}`;
    const headers = {
        authorization: `Bearer ${token}`
    };
    const response = await serverRequest(url, method, search, headers);
    return response;
}

export const searchUserByName = async (search, token) => {
    if (!search) {
        return INVALID_DATA;
    }
    const method = 'GET';
    const url = BASE_URI + `user/name?search=${search}`;
    const headers = {
        authorization: `Bearer ${token}`
    };
    const response = await serverRequest(url, method, search, headers);
    return response;
}

export const accessChat = async (userId, token) => {
    if (!userId) {
        return INVALID_DATA;
    }
    const method = 'POST';
    const url = BASE_URI + 'chat';
    const headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    };
    const data = {
        userId
    };
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const fetchChats = async (token) => {
    if (!token) {
        return INVALID_DATA;
    }
    const method = 'GET';
    const url = BASE_URI + 'chat';
    const headers = {
        authorization: `Bearer ${token}`
    };
    const data = {
        token
    }
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const createGroupChat = async (name, users, token) => {
    if (!name || !users) {
        return INVALID_DATA;
    }
    const method = 'POST';
    const url = BASE_URI + 'chat/group';
    const headers = {
        authorization: `Bearer ${token}`
    };
    const data = {
        name,
        users: JSON.stringify(users)
    };
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const renameGroup = async (newGroupName, chatId, token) => {
    if (!chatId || !newGroupName) {
        return INVALID_DATA;
    }
    const method = 'PUT';
    const url = BASE_URI + 'chat/rename';
    const headers = {
        authorization: `Bearer ${token}`
    }
    const data = {
        chatId,
        chatName: newGroupName
    }
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const addUser = async (userId, chatId, token) => {
    if (!chatId || !userId) {
        return INVALID_DATA;
    }
    const method = 'PUT';
    const url = BASE_URI + 'chat/groupadd';
    const headers = {
        authorization: `Bearer ${token}`
    }
    const data = {
        chatId,
        userId
    }
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const removeUser = async (userId, chatId, token) => {
    if (!chatId || !userId) {
        return INVALID_DATA;
    }
    const method = 'PUT';
    const url = BASE_URI + 'chat/groupremove';
    const headers = {
        authorization: `Bearer ${token}`
    }
    const data = {
        chatId,
        userId
    }
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const sendMessage = async (message, chatId, token) => {
    if (!message || !chatId) {
        return INVALID_DATA;
    }
    const method = 'POST';
    const url = BASE_URI + 'message/';
    const headers = {
        authorization: `Bearer ${token}`
    }
    const data = {
        message,
        chatId
    };
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const getAllMessages = async (chatId, token) => {
    if (!chatId) {
        return INVALID_DATA;
    }
    const method = 'GET';
    const url = BASE_URI + `message/${chatId}`;
    const headers = {
        authorization: `Bearer ${token}`
    }
    const data = {};
    const response = await serverRequest(url, method, data, headers);
    return response;
}

export const markUnreadMessages = async (messageIds, chatId, token) => {
    if (!messageIds || messageIds.length < 0) {
        return {
            status: 'ok',
            message: 'no message to mark as seen'
        };
    }
    const method = 'POST';
    const url = BASE_URI + `message/${chatId}`;
    const headers = {
        authorization: `Bearer ${token}`
    };
    const data = {
        messageIds
    };
    const response = await serverRequest(url, method, data, headers);
    return response;
}


