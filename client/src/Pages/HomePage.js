import React from 'react';
import '../Layout.css';

import ChatList from '../components/chat-list/ChatList';
import ChatWindow from '../components/chat window/ChatWindow';

function HomePage() {

    return (
        <div className='home-page'>
            <div className='chat-list'>
                <ChatList />
            </div>
            <ChatWindow />
        </div>
    );
}

export default HomePage;
