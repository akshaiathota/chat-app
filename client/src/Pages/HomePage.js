import React, { useEffect } from 'react';
import '../Layout.css';
import ChatList from '../components/chat-list/ChatList';
import ChatWindow from '../components/chat window/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../redux/user/userSelectors';
import socketActionTypes from '../redux/socket/socketActionTypes';

function HomePage() {
    const user = useSelector(getLoggedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user)
            dispatch({ type: socketActionTypes.SET_UP, payload: user });
    }, [user, dispatch]);



    return (
        <>
            <div className='home-page'>
                <ChatList />
                <ChatWindow />
            </div>
        </>
    );
}

export default HomePage;
