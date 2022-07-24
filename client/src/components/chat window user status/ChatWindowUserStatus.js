import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';
import { getLoggedUser } from '../../redux/user/userSelectors';
import ChatMenu from '../chat menu/ChatMenu';

function ChatWindowUserStatus({ children }) {
    const selectedChat = useSelector(getSelectedChat);
    const user = useSelector(getLoggedUser);
    const usersStatus = useSelector((state) => state.usersStatus);

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

    }, [user, selectedChat, usersStatus]);


    return (
        <>
            {
                children
            }
            <div className={` ${selectedChat && !selectedChat.isGroupChat && usersStatus[getOtherUser(selectedChat.users)._id] ? 'cw-user-offline' : ''}`}>
                <h4>{
                    selectedChat.isGroupChat ? selectedChat.chatName : getOtherUser(selectedChat.users).name
                }</h4>
                {
                    selectedChat && !selectedChat.isGroupChat && usersStatus[getOtherUser(selectedChat.users)._id] ? <h5>Online</h5> : <></>
                }
            </div>
            {
                selectedChat.isGroupChat ? <ChatMenu chat={selectedChat} />
                    : <></>
            }
        </>
    )
}

export default ChatWindowUserStatus;