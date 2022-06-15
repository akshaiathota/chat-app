import React, { useState } from 'react';
import './index.css';
import ChatListItem from '../chat-list-item';
import dummyData from '../../Pages/DummyData';

function ChatList(){
    const [data,setData]=useState(dummyData);

    return (
        <div className='chat-list'>
              <h1 className='cl-heading'>
                   Messages
              </h1>
              <div className='cl-search-bar'>
                   <input type='text' placeholder='Search...' />
              </div>
              <div className='cl-chat-holder'>
                   {
                data?data.map((chat)=><ChatListItem {...chat} />):""
                  }
              </div>
              
        </div>
    );
}

export default ChatList;