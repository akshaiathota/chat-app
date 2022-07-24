import React, { useEffect } from 'react';
import './ChatWindow.css';
import Messages from '../messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';
import ChatWindowUserStatus from '../chat window user status/ChatWindowUserStatus';
import { IoMdArrowRoundBack } from 'react-icons/io';
import selectedChatActionTypes from '../../redux/selectedChat/selectedChatActionTypes';

function ChatWindow({ className }) {
  const selectedChat = useSelector(getSelectedChat);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [selectedChat]);

  function handleGoBack() {
    dispatch({ type: selectedChatActionTypes.UPDATE_SELECTED_CHAT, payload: null });
  }

  return (
    <>
      {
        selectedChat ?
          <div className={`chat-window ${className} ${className ? 'cwus-back-button-visible' : ''}`} id='chat-window' >
            <div className='cw-header'>
              <ChatWindowUserStatus >
                {
                  className ?
                    <IoMdArrowRoundBack style={{ position: 'absolute', top: '18px', cursor: 'pointer' }} size='25px' onClick={handleGoBack} />
                    : <></>
                }
              </ChatWindowUserStatus>
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