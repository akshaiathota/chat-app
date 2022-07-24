import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import userActionTypes from '../../redux/user/userActionTypes';
import { getLoggedUser } from '../../redux/user/userSelectors';

function Login() {
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const user = useSelector(getLoggedUser);
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();
        const inputData = {
            email: email.current.value,
            password: password.current.value
        };
        dispatch({ type: userActionTypes.SIGN_IN_START, payload: inputData });
    }

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user])

    return (
        <>
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
                </div>
            </form>
        </>
    )
}

export default Login;