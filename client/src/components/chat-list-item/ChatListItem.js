import React from "react";
import './ChatListItem.css';

function ChatListItem(obj) {
    // console.log(obj);
    const { name, messages, lastChatTime } = obj;
    return (
        <div className='chat-list-item'>
            <div className='cli-image-container'>
                <img />
            </div>
            <div className='cli-chat-details'>
                <div >
                    <div className='cli-chat-name'>
                        {name ? name : "Surya"}
                    </div>
                    <div className='cli-chat-last-msg' >
                        {messages ? messages[messages.length - 1] : "nothing"}
                    </div>
                </div>
                <div>
                    <div className='cli-chat-time'>
                        {lastChatTime ? lastChatTime : "00:00"}
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