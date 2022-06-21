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
    try {
        //console.log(inputData);
        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + 'user/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: inputData
        });

        const responseData = {
            status: 'ok',
            data: data.data,
            message: data.message
        }
        return responseData;
    }
    catch (error) {
        console.log(error);
        if (error.response.data) {
            const { message, type } = error.response.data;
            const responseData = {
                status: type,
                message
            }
            return responseData;
        }
        return {
            status: 'error',
            message: 'server error'
        };
    }
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
    try {
        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + 'user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: inputData
        });
        const responseData = {
            status: 'ok',
            data: data.data,
            message: data.message
        };
        return responseData;
    }
    catch (error) {
        const { message, type } = error.response.data;
        const responseData = {
            status: type,
            message
        }
        return responseData;
    }
}

export const searchUser = async (search, token) => {
    console.log('searching user...');
    if (!search) {
        return {
            status: 'error',
            message: 'Search query empty'
        };
    }
    try {
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + `user?search=${search}`,
            headers: {
                authorization: `Bearer ${token}`
            },
            data: search
        });
        const responseData = {
            message: data.message,
            data: data.data,
            status: 'ok'
        };
        return responseData;
    }
    catch (error) {
        const { message, type } = error.response.data;
        const responseData = {
            status: type,
            message
        }
        return responseData;
    }
}

export const accessChat = async (userId, token) => {
    console.log('accessing chat...');
    if (!userId) {
        return {
            status: 'error',
            message: 'invalid userId'
        };
    }
    try {
        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + 'chat',
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                userId
            }
        });
        const responseData = {
            message: data.message,
            status: 'ok',
            data: data.data
        }
        return responseData;
    }
    catch (error) {
        const { message, type } = error.response.data;
        const responseData = {
            status: type,
            message
        }
        return responseData;
    }
}

export const fetchChat = async (token) => {
    if (!token) {
        return {
            status: 'error',
            message: 'invalid or empty token'
        };
    }
    try {
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + 'chat',
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                token
            }
        });
        const responseData = {
            message: data.message,
            status: 'ok',
            data: data.data
        }
        return responseData;
    }
    catch (error) {
        const { message, type } = error.response.data;
        const responseData = {
            status: type,
            message
        }
        return responseData;
    }
}