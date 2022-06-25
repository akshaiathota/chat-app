import React from 'react';
import { ChatState } from '../../utils/ChatProvider';
import ChatListItem from '../chat-list-item/ChatListItem';
import './ChatHolder.css';


function ChatHolder() {
    const { chats } = ChatState();
    return (
        <div className='chat-holder'>
            {
                chats ? chats.map((chat) => <ChatListItem key={chat._id} chat={chat} />) : ""
            }
        </div>
    )
}

export default ChatHolder