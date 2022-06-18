import React, { useRef } from 'react'
import './login.css';
import { loginUser } from '../../utils/httpRequests';

function Login() {
    const email = useRef(null);
    const password = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const inputData = {
            email: email.current.value,
            password: password.current.value
        };
        console.log('handling login...');
        const response = await loginUser(inputData);
        console.log(response);
    }

    return (
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
                <input className='button' type='submit' value='Login' />
                <input className='button' type='button' value='Get Guest User Credentials' />
            </div>
        </form>
    )
}

export default Login