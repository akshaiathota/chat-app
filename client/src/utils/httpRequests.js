import axios from 'axios';

const BASE_URI = 'http://localhost:5000/';

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
        const responseData = {
            status: 'error',
            message: 'Invalid Data'
        }
        return responseData;
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
        const responseData = {
            status: 'error',
            message: 'Invalid Credentials'
        }
        return responseData;
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
    //console.log('searching user...');
    if (!search) {
        return {
            status: 'error',
            message: 'Search query empty'
        };
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
    //console.log('searching user...');
    if (!search) {
        return {
            status: 'error',
            message: 'Search query empty'
        };
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
    console.log('accessing chat...');
    if (!userId) {
        return {
            status: 'error',
            message: 'invalid userId'
        };
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
        return {
            status: 'error',
            message: 'invalid or empty token'
        };
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
    console.log(name);
    console.log(users);
    if (!name || !users) {
        return {
            status: 'error',
            message: 'missing or invalid data'
        };
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
        return {
            status: 'error',
            message: 'missing or invalid data'
        };
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
        return {
            status: 'error',
            message: 'missing or invalid data'
        };
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
        return {
            status: 'error',
            message: 'missing or invalid data'
        };
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


