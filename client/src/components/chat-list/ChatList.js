import React from 'react';
import './ChatList.css';
import { toast, ToastContainer } from 'react-toastify';
import NavigationMenu from '../navigation menu/NavigationMenu';
import ChatHolder from '../chat holder/ChatHolder';

function ChatList({ className }) {

  return (
    <>
      <NavigationMenu />
      <div className={`chat-list ${className}`} id='chat-list'>
        <ToastContainer />
        <div className='cl-title'>
          <h5>D.A.D</h5>
        </div>
        <ChatHolder />
      </div>
    </>
  );
}

export default ChatList;