import React, { useEffect, useRef } from 'react';
import './ChatList.css';
import { ChatState } from '../../utils/ChatProvider';
import { fetchChats } from '../../utils/httpRequests';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../navigation menu/NavigationMenu';
import ChatHolder from '../chat holder/ChatHolder';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';

function ChatList({ socket }) {
  const { setChats } = ChatState();
  const user = useSelector(getLoggedUser);
  const search = useRef("");
  const navigate = useNavigate();
  // const [searchLocal,setSearchLocal] = useState(f)

  async function fetchUserChats() {
    console.log('fetching user chats');
    if (user == null) {
      return;
    }
    const response = await fetchChats(user.token);
    console.log(response);
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

  useEffect(() => {
    if (user) {
      fetchUserChats();
    }
  }, [user]);

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