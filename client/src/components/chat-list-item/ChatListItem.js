import React from "react";
import { ChatState } from "../../utils/ChatProvider";
import './ChatListItem.css';

function ChatListItem({ chat, onClick }) {
    const { user } = ChatState();
    const { users } = chat;

    function getOtherUser() {
        if (!user || !users) {
            return null;
        }
        if (users.length == 1) {
            return 1;
        }
        return users[0]._id === user._id ? users[1] : users[0];
    }

    console.log(chat);
    return (
        <>
            {
                user && users ?
                    <div className='chat-list-item' onClick={() => getOtherUser()._id}>
                        <div className='cli-image-container'>
                            <img />
                        </div>
                        <div className='cli-chat-details'>
                            <div >
                                <div className='cli-chat-name'>
                                    {
                                        !chat.isGroupChat ? getOtherUser().name : chat.chatName
                                    }
                                </div>
                                <div className='cli-chat-last-msg' >
                                    hello World!
                                </div>
                            </div>
                            <div>
                                <div className='cli-chat-time'>
                                    4:00PM
                                </div>
                                <div className='cli-chat-new-msg' >
                                    <div>
                                        1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </>
    );
}

export default ChatListItem;