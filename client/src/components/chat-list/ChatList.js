import React, { useEffect, useRef, useState } from 'react';
import './ChatList.css';
import ChatListItem from '../chat-list-item/ChatListItem';
import { ChatState } from '../../utils/ChatProvider';
import { GiHamburgerMenu } from 'react-icons/gi';
import { accessChat, searchUser } from '../../utils/httpRequests';
import { toast, ToastContainer } from 'react-toastify';


function ChatList() {
  const { user } = ChatState();
  const search = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const [chatSelected, setChatSelected] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  async function fetch() {
    const response = await searchUser(search.current.value, user.token);
    console.log(response);
    if (response.status === 'error') {
      toast(response.message);
    }
    else {
      setSearchResult(response.data);
    }
  }

  async function handleClick(id) {
    const response = await accessChat(id, user.token);
    console.log(response);
    if (response.status === 'error') {
      toast(response.message);
    }
    else {
      setChatSelected(response.data);
    }
  }


  useEffect(() => {
    async function handleKeyPress(event) {
      let characterCode = event.code || event.key;
      if (characterCode === 'Enter') {
        await fetch();
      }
    }

    const searchTag = document.getElementById('search-user');
    searchTag.addEventListener('keydown', handleKeyPress);
    return () => {
      searchTag.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  return (
    <div className='chat-list'>
      <ToastContainer />
      <div className='cl-title'>
        <GiHamburgerMenu size={30} style={{ color: 'white' }} />
        <input type='text' placeholder='Search' title='Search for users to chat' ref={search} id='search-user' />
      </div>
      <div className='cl-chat-holder'>
        {
          searchResult ? searchResult.map((user) => <ChatListItem key={user._id} otherUser={user} onClick={handleClick} />) : ""
        }
      </div>

    </div>
  );
}

export default ChatList;