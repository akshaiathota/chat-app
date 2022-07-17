import React, { useEffect } from 'react';
import '../Layout.css';
import ChatList from '../components/chat-list/ChatList';
import ChatWindow from '../components/chat window/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../redux/user/userSelectors';
import socketActionTypes from '../redux/socket/socketActionTypes';
import getSocket from '../redux/socket/socketSelector';

function HomePage() {
    const user = useSelector(getLoggedUser);
    const socket = useSelector(getSocket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user)
            dispatch({ type: socketActionTypes.SET_UP, payload: user });
    }, [user]);



    return (
        <>
            <div className='home-page'>
                <ChatList socket={socket} />
                <ChatWindow socket={socket} />
            </div>
        </>
    );
}

export default HomePage;
