import React, { useState } from 'react';
import { ChatState } from '../../utils/ChatProvider';
import './ChatWindow.css';
import ChatMenu from '../chat menu/ChatMenu';

function ChatWindow() {
  const { user, selectedChat } = ChatState();
  console.log(selectedChat);

  function getOtherUser(users) {
    if (!user || !users) {
      return null;
    }
    if (users.length == 1) {
      return;
    }
    return users[0]._id === user._id ? users[1] : users[0];
  }

  return (
    <>
      <div className='chat-window'>
        <div className='cw-header'>
          <div >
            <h4>{selectedChat ? selectedChat.isGroupChat ? selectedChat.chatName : getOtherUser(selectedChat.users).name : ""}</h4>
          </div>
          {
            selectedChat ? <ChatMenu chat={selectedChat} />
              : <></>
          }
        </div>
        <div className='cw-chat'>
          {
            selectedChat ?
              <></>
              :
              <div className='cw-no-user'>
                <h4>Select a user to Chat</h4>
              </div>
          }
        </div>
        <div className='cw-input-field'>
          <textarea />
        </div>
      </div>
    </>
  )
}

export default ChatWindow;