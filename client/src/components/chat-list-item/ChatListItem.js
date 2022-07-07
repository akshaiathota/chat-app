import React from "react";
import { ChatState } from "../../utils/ChatProvider";
import './ChatListItem.css';
import DP from '../../assets/default dp.jpg';

function ChatListItem({ chat }) {
    const { user, setSelectedChat, selectedChat } = ChatState();
    const { users } = chat;

    const url = getOtherUser().pic;
    let time = null, lastMsgTime = null;
    if (chat && chat.latestMessage) {
        time = new Date(chat.latestMessage.updatedAt);
        lastMsgTime = time.getHours() + ":" + time.getMinutes();
    }
    function handleSelectedChat() {
        setSelectedChat(chat);
    }

    function getOtherUser() {
        if (!user || !users) {
            return null;
        }
        if (users.length === 1) {
            return;
        }
        return users[0]._id === user._id ? users[1] : users[0];
    }

    return (
        <>
            {
                user && users ?
                    <div className={`${chat === selectedChat ? 'cli-selected-chat' : ''} chat-list-item`} onClick={() => handleSelectedChat()}>
                        <div className='cli-image-container'>
                            <img src={url === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                DP : url} />
                        </div>
                        <div className='cli-chat-details'>
                            <div >
                                <div className='cli-chat-name'>
                                    {
                                        !chat.isGroupChat ? getOtherUser().name : chat.chatName
                                    }
                                </div>
                                <div className={`${chat === selectedChat ? 'color-black' : ''} cli-chat-last-msg`} >
                                    {chat.latestMessage ? chat.latestMessage.content : <></>}
                                </div>
                            </div>
                            <div>
                                <div className={`${chat === selectedChat ? 'color-black' : ''} cli-chat-time`}>
                                    {
                                        lastMsgTime ? lastMsgTime : <></>
                                    }
                                </div>
                                {
                                    chat.count > 0 ?
                                        <div className='cli-chat-new-msg' >
                                            <div>
                                                {chat.count}
                                            </div>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </>
    );
}

export default ChatListItem;