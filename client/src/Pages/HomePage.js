import React, { useEffect, useState } from 'react';
import '../Layout.css';
import ChatList from '../components/chat-list/ChatList';
import ChatWindow from '../components/chat window/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../redux/user/userSelectors';
import socketActionTypes from '../redux/socket/socketActionTypes';
import getSelectedChat from '../redux/selectedChat/selectedChatSelector';

function HomePage() {
    const user = useSelector(getLoggedUser);
    const dispatch = useDispatch();
    const selectedChat = useSelector(getSelectedChat);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        if (user)
            dispatch({ type: socketActionTypes.SET_UP, payload: user });
    }, [user, dispatch]);

    useEffect(() => {

    }, [selectedChat]);

    useEffect(() => {
        if (window.innerWidth <= '628' && !selectedChat) {
            resizeListener()
        }
        const resizeListener = function () {
            if (window.innerWidth <= '628') {
                if (!smallScreen) {
                    setSmallScreen(true);
                }
            }
            else {
                if (smallScreen) {
                    setSmallScreen(false);
                }
            }
        }
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [smallScreen]);


    return (
        <>
            <div className='home-page'>
                {
                    !smallScreen ?
                        <>
                            <ChatList />
                            <ChatWindow />
                        </>
                        : selectedChat ?
                            <ChatWindow className={'screen-small-cw'} /> :
                            <ChatList className={'screen-small-cl'} />
                }
            </div>
        </>
    );
}

export default HomePage;
