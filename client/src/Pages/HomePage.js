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

    useEffect(() => {
        console.log('in home useeffect');
        const newSocket = socketIo.connect(ENDPOINT, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });
        newSocket.emit('setup', user);
        newSocket.on('connected', () => {
            console.log('connected');
        });
        setSocket(newSocket);
        //console.log(newSocket.connected);
        return () => {
            newSocket.disconnect();
            //console.log(newSocket.connected);
        }
    }, []);



    return (
        <>
            <div className='home-page'>
                <div className='chat-list'>
                    <ChatList />
                </div>
                <ChatWindow socket={socket} />
            </div>
        </>
    );
}

export default HomePage;
