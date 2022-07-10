import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { loginUser } from '../../utils/httpRequests';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import userActionTypes from '../../redux/user/userActionTypes';

function Login() {
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();
        const inputData = {
            email: email.current.value,
            password: password.current.value
        };
        // console.log('handling login...');
        // const response = await loginUser(inputData);
        // if (response !== null) {
        //     const { status, data, message } = response;
        //     if (status === 'error') {
        //         toast(message);
        //     }
        //     else {
        //         console.log(data);
        //         localStorage.setItem('userData', JSON.stringify(data));
        //         navigate('/home');
        //     }
        // }
        dispatch({ type: userActionTypes.SIGN_IN_START, payload: inputData });
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className='login-page'>
                    <div className='l-email'>
                        <label>Email<span className='l-red'>*</span></label>
                        <input type='email' placeholder='Enter your email' ref={email} required />
                    </div>
                    <div className='l-password'>
                        <label>Password<span className='l-red'>*</span></label>
                        <input type='password' placeholder='Enter your password' ref={password} required />
                    </div>
                    <input className='l-button' type='submit' value='Login' />
                    <input className='l-button' type='button' value='Get Guest User Credentials' />
                </div>
            </form>
        </>
    )
}

export default Login;