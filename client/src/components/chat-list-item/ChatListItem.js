import React from "react";
import { ChatState } from "../../utils/ChatProvider";
import './ChatListItem.css';

function ChatListItem(obj) {
    const { otherUser, onClick } = obj;
    const { user } = ChatState();
    const { _id } = otherUser;
    return (
        <div className='chat-list-item' onClick={() => onClick(_id)}>
            <div className='cli-image-container'>
                <img />
            </div>
            <div className='cli-chat-details'>
                <div >
                    <div className='cli-chat-name'>
                        {!otherUser ? (otherUser.isGroupChat ? otherUser.chatName : otherUser.users[0]._id === user._id ? otherUser.users[1].name : otherUser.users[0].name) : 'fake'}
                    </div>
                    <div className='cli-chat-last-msg' >
                        {/* {messages ? messages[messages.length - 1] : ""} */}
                    </div>
                </div>
                <div>
                    <div className='cli-chat-time'>
                        {/* {lastChatTime ? lastChatTime : ""} */}
                    </div>
                    <div className='cli-chat-new-msg' >
                        <div>
                            1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatListItem;