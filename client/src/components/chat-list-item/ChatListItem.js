import React from "react";
import './ChatListItem.css';

function ChatListItem(obj) {
    const { otherUser, onClick } = obj;
    const { name, messages, lastChatTime, _id } = otherUser;

    return (
        <div className='chat-list-item' onClick={() => onClick(_id)}>
            <div className='cli-image-container'>
                <img />
            </div>
            <div className='cli-chat-details'>
                <div >
                    <div className='cli-chat-name'>
                        {name ? name : ""}
                    </div>
                    <div className='cli-chat-last-msg' >
                        {messages ? messages[messages.length - 1] : ""}
                    </div>
                </div>
                <div>
                    <div className='cli-chat-time'>
                        {lastChatTime ? lastChatTime : ""}
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