import React from 'react'
import './login.css';

function Login() {
    return (
        <form>
            <div className='login-page'>
                <div className='l-email'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' />
                </div>
                <div className='l-password'>
                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' />
                </div>
                <input className='button' type='submit' value='Login' />
                <input className='button' type='button' value='Get Guest User Credentials' />
            </div>
        </form>
    )
}

export default Login