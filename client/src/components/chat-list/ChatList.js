import React, { useEffect, useRef, useState } from 'react';
import './ChatList.css';
import ChatListItem from '../chat-list-item/ChatListItem';
import { ChatState } from '../../utils/ChatProvider';
import { GiHamburgerMenu } from 'react-icons/gi';
import { accessChat, searchUser, fetchChats } from '../../utils/httpRequests';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ChatList() {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const search = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  async function fetchSearchedUser() {
    console.log('fetching searched user');
    const response = await searchUser(search.current.value, user.token);
    console.log(response);
    if (response.status === 'error') {
      toast(response.message);
      if (response.message === 'Not authorized, token failed') {
        localStorage.removeItem('userData');
        navigate('/');
      }
    }
    else {
      const { data } = response;
      const doesChatExist = chats ? chats.find((chat) => chat._id === data._id) : true;
      if (!doesChatExist) {
        setChats([data, ...chats]);
      }
      setSearchResult(data);
    }
  }

  async function fetchUserChats() {
    console.log('fetching searched user');
    if (user == null) {
      return;
    }
    const response = await fetchChats(user.token);
    if (response.status === 'error') {
      toast(response.message);
      if (response.message === 'Not authorized, token failed') {
        localStorage.removeItem('userData');
        navigate('/');
      }
    }
    else {
      console.log(response.data);
      setChats(response.data);
    }
  }

  async function handleClick(id) {
    const response = await accessChat(id, user.token);
    console.log(response);
    if (response.status === 'error') {
      toast(response.message);
      if (response.message === 'Not authorized, token failed') {
        localStorage.removeItem('userData');
        navigate('/');
      }
    }
    else {
      setSelectedChat(response.data);
      setSearchResult(null);
    }
  }



  useEffect(() => {
    async function handleKeyPress(event) {
      let characterCode = event.code || event.key;
      if (characterCode === 'Enter') {
        await fetchSearchedUser();
      }
    }
    if (user) {
      fetchUserChats();
    }
    const searchTag = document.getElementById('search-user');
    searchTag.addEventListener('keydown', handleKeyPress);

    return () => {
      searchTag.removeEventListener('keydown', handleKeyPress);
    }
  }, [user]);

  return (
    <div className='chat-list'>
      <ToastContainer />
      <div className='cl-title'>
        <GiHamburgerMenu size={30} style={{ color: 'white' }} />
        <input type='text' placeholder='Search' title='Search for users to chat' ref={search} id='search-user' />
      </div>
      <div className='cl-chat-holder'>
        {
          chats ? chats.map((user) => <ChatListItem key={user._id} otherUser={user} onClick={handleClick} />) : ""
        }
      </div>

    </div>
  );
}

export default ChatList;