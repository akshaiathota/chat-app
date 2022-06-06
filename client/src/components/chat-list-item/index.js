import React from "react";
import './index.css';

function ChatListItem() {
    return (
        <div className='chat-list-item'>
            <div className='cli-image-container'>
                <img />
            </div>
            <div className='cli-chat-details'>
                <div >
                    <div className='cli-chat-name'>
                        Surya
                    </div>
                    <div className='cli-chat-last-msg' >
                        hello world!
                    </div>
                </div>
                <div>
                    <div className='cli-chat-time'>
                        4:39PM
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