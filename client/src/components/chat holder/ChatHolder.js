import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatActionTypes from '../../redux/chats/chatActionTypes';
import getChats from '../../redux/chats/chatSelector';
import { getLoggedUser } from '../../redux/user/userSelectors';
import ChatListItem from '../chat-list-item/ChatListItem';
import './ChatHolder.css';


function ChatHolder() {
    const chats = useSelector(getChats);
    const user = useSelector(getLoggedUser);
    const dispatch = useDispatch();

    function fetchUserChats() {
        if (user == null) {
            return;
        }
        const payload = {
            token: user.token
        }
        dispatch({ type: chatActionTypes.FETCH_CHATS, payload: payload });
    }

    useEffect(() => {
        if (user) {
            fetchUserChats();
        }
    }, [user]);

    useEffect(() => {

    }, [chats]);

    return (
        <div className='chat-holder'>
            {
                chats && chats.length > 0 ? chats.map((chat) => <ChatListItem key={chat._id} chat={chat} />) : ""
            }
        </div>
    )
}

export default ChatHolder;