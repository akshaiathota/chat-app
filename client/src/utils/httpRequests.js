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
        console.log('sign up inputs are invalid')
        return null;
    }
    try {
        const response = await fetch(BASE_URI + 'user/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });
        const { data, message } = await response.json();
        const responseData = {
            status: response.status,
            data,
            message
        }
        return responseData;
    }
    catch (error) {
        console.log('error in register user request');
        console.log(error);
    }
}


export const loginUser = async (inputData) => {
    const inputsValidity = areLoginInputsValid(inputData);
    if (!inputsValidity) {
        console.log('invalid syntax: email or password');
        return null;
    }
    try {
        const response = await fetch(BASE_URI + 'user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });
        const { data, message } = await response.json();
        const responseData = {
            status: response.status,
            data,
            message
        };
        return responseData;
    }
    catch (error) {
        console.log('error in fetch request for logging in user');
        console.log(error);
    }
}
