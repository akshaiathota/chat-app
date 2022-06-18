import React from 'react';
import './signup.css';

function Signup() {
    return (
        <form>
            <div className='signup-page'>
                <div className='s-input'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter your name' />
                </div>
                <div className='s-input'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' />
                </div>
                <div className='s-input'>
                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' />
                </div>
                <div className='s-input'>
                    <label>Password</label>
                    <input type='password' placeholder='Reenter your password' />
                </div>
                <div className='s-input'>
                    <label>Upload your picture</label>
                    <input type='file' accept='image/*' />
                </div>
                <input type='submit' value='Sign Up' />
            </div>
        </form>
    )
}

export default Signup