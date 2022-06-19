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
            url: BASE_URI + 'user/signup',
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
        //console.log(error);
        const { message, type } = error.response.data;
        const responseData = {
            status: type,
            message
        }
        return responseData;
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

export const uploadProfilePic = async (inputData) => {

}
