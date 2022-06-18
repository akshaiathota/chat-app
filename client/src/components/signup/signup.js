import React, { useRef } from 'react';
import './signup.css';
import { registerUser } from '../../utils/httpRequests';

function Signup() {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const mobileNumber = useRef(null);
    const profilePic = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
            mobileNumber: mobileNumber.current.value,
            pic: profilePic.current.value
        };
        const response = await registerUser(data);
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='signup-page'>
                <div className='s-input'>
                    <label>Name<span className='l-red'>*</span></label>
                    <input type='text' placeholder='Enter your name' ref={name} required />
                </div>
                <div className='s-input'>
                    <label>Email<span className='l-red'>*</span></label>
                    <input type='email' placeholder='Enter your email' ref={email} required />
                </div>
                <div className='s-input'>
                    <label>Password<span className='l-red'>*</span></label>
                    <input type='password' placeholder='Enter your password' ref={password} required />
                </div>
                <div className='s-input'>
                    <label>Confirm Password<span className='l-red'>*</span></label>
                    <input type='password' placeholder='Reenter your password' ref={confirmPassword} required />
                </div>
                <div className='s-input'>
                    <label>Mobile Number<span className='l-red'>*</span></label>
                    <input type="tel" name="telphone" placeholder="8888888888" pattern="[0-9]{10}" maxLength="10" ref={mobileNumber} required />
                </div>
                <div className='s-input'>
                    <label>Upload your picture</label>
                    <input type='file' accept='image/*' ref={profilePic} />
                </div>
                <input type='submit' value='Sign Up' />
            </div>
        </form>
    )
}

export default Signup