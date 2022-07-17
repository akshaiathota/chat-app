import React, { useEffect } from 'react';
import './ChatWindow.css';
import ChatMenu from '../chat menu/ChatMenu';
import Messages from '../messages/Messages';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';

function ChatWindow() {
  const selectedChat = useSelector(getSelectedChat);
  const user = useSelector(getLoggedUser);
  function getOtherUser(users) {
    if (!user || !users) {
      return null;
    }
    if (users.length === 1) {
      return;
    }
    return users[0]._id === user._id ? users[1] : users[0];
  }

  useEffect(() => {

  }, [user, selectedChat]);

  return (
    <>
      {
        selectedChat ?
          <div className={`chat-window`} >
            <div className='cw-header'>
              <div >
                <h4>{
                  selectedChat.isGroupChat ? selectedChat.chatName : getOtherUser(selectedChat.users).name
                }</h4>
              </div>
              {
                selectedChat.isGroupChat ? <ChatMenu chat={selectedChat} />
                  : <></>
              }
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