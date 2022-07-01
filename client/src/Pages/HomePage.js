import React, { useEffect, useState } from 'react';
import '../Layout.css';
import ChatList from '../components/chat-list/ChatList';
import ChatWindow from '../components/chat window/ChatWindow';
import { ChatState } from '../utils/ChatProvider';
import socketIo from 'socket.io-client';

function HomePage() {
    const { user } = ChatState();
    const ENDPOINT = 'http://localhost:5000';
    const [socket, setSocket] = useState(null);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        //console.log('in home useeffect');
        const newSocket = socketIo.connect(ENDPOINT, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });
        newSocket.emit('setup', user);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, []);



    return (
        <>
            <div className='home-page'>
                <ChatList />
                <ChatWindow socket={socket} />
            </div>
        </>
    );
}

export default HomePage;
