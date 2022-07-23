import React, { useEffect } from 'react';
import './ChatWindow.css';
import Messages from '../messages/Messages';
import { useSelector } from 'react-redux';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';
import ChatWindowUserStatus from '../chat window header/ChatWindowUserStatus';

function ChatWindow() {
  const selectedChat = useSelector(getSelectedChat);

  useEffect(() => {

  }, [selectedChat]);

  return (
    <>
      {
        selectedChat ?
          <div className={`chat-window`} >
            <div className='cw-header'>
              <ChatWindowUserStatus />
            </div>
            <div className='cw-chat'>
              {
                selectedChat ?
                  <Messages />
                  : <></>
              }
            </div>
          </div>
          :
          <div className='cw-no-user'>
            <h4>Select a user to Chat</h4>
          </div>
      }

    </>
  )
}

export default ChatWindow;