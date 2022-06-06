import React from 'react';
import './index.css';
import ChatListItem from '../chat-list-item';

function ChatList(){
    return (
        <div className='chat-list'>
              <h1 className='cl-heading'>
                   Messages
              </h1>
              <div className='cl-search-bar'>
                   <input type='text' placeholder='Search...' />
              </div>
              <ChatListItem />
        </div>
    );
}

export default ChatList;