import React, { useEffect, useRef } from 'react';
import './ChatList.css';
import { toast, ToastContainer } from 'react-toastify';
import NavigationMenu from '../navigation menu/NavigationMenu';
import ChatHolder from '../chat holder/ChatHolder';

function ChatList({ socket }) {

  return (
    <>
      <NavigationMenu socket={socket} />
      <div className={`chat-list`} >
        <ToastContainer />
        <div className='cl-title'>
          <h5>Just An Other Chat Application</h5>
        </div>
        <ChatHolder />
      </div>
    </>
  );
}

export default ChatList;