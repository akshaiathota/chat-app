import React, { useEffect, useRef, useState } from 'react';
import './signup.css';
import { registerUser } from '../../utils/httpRequests';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import userActionTypes from '../../redux/user/userActionTypes';

function Signup() {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const mobileNumber = useRef(null);
    const [profilePic, setProfilePic] = useState(
        {
            pic: null,
            type: null
        }
    );
    const user = useSelector(getLoggedUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    function handleImage(file) {
        let reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setProfilePic((prevValues) => {
                return {
                    pic: reader.result,
                    type: file.type
                }
            });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const { type, pic } = profilePic;
        if (pic != null && type !== null && type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
            return;
        }
        const inputData = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
            mobileNumber: mobileNumber.current.value,
            pic: profilePic
        }
        dispatch({ type: userActionTypes.SIGN_UP_START, payload: inputData });
    }

    return (
        <>
            <ToastContainer />
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
                        <input type='file' accept='image/jpeg, image/png, image/jpg' onChange={(event) => handleImage(event.target.files[0])} />
                    </div>
                    <input type='submit' value='Sign Up' />
                </div>
            </form>
        </>
    )
}

export default Signup