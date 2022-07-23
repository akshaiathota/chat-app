import React, { useEffect, useState } from 'react';
import './ChatList.css';
import { toast, ToastContainer } from 'react-toastify';
import NavigationMenu from '../navigation menu/NavigationMenu';
import ChatHolder from '../chat holder/ChatHolder';
import { useSelector } from 'react-redux';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';

function ChatList() {
  const [smallScreen, setSmallScreen] = useState(false);
  const selectedChat = useSelector(getSelectedChat);

  useEffect(() => {
    function windowSizeListener(event) {
      if (window.innerWidth <= '628' && !smallScreen) {
        setSmallScreen(true);
      }
      else if (window.innerWidth > '628' && smallScreen) {
        setSmallScreen(false);
      }
    }
    window.addEventListener('resize', windowSizeListener);
    return () => {
      window.removeEventListener('resize', windowSizeListener);
    }
  }, []);

  useEffect(() => {

  }, [selectedChat])


  return (
    <>
      <NavigationMenu />
      <div className={`chat-list ${smallScreen && selectedChat ? 'screen-small-cl' : ''}`} >
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