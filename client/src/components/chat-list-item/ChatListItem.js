import React, { useEffect, useState } from "react";
import './ChatListItem.css';
import DP from '../../assets/default dp.jpg';
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../redux/user/userSelectors";
import getSelectedChat from "../../redux/selectedChat/selectedChatSelector";
import selectedChatActionTypes from "../../redux/selectedChat/selectedChatActionTypes";

function ChatListItem({ chat }) {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const selectedChat = useSelector(getSelectedChat);
    const user = useSelector(getLoggedUser);
    const { users } = chat;
    let url = null;
    const otherUser = getOtherUser();
    if (otherUser) {
        url = otherUser.pic;
    }
    let time = null, lastMsgTime = null;
    if (chat && chat.latestMessage) {
        time = new Date(chat.latestMessage.updatedAt);
        lastMsgTime = time.getHours() + ":" + time.getMinutes();
    }

    function handleSelectedChat() {
        dispatch({ type: selectedChatActionTypes.SELECT_CHAT, payload: chat });
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

    useEffect(() => {

    }, [user, selectedChat]);

    useEffect(() => {
        if (chat) {
            let currentCount = 0;
            chat.unread.forEach((obj) => {
                if (obj.user._id === user._id) {
                    currentCount = obj.messages.length;
                }
            });
            if (currentCount !== count) {
                setCount(currentCount);
            }
        }
    }, [count, chat]);

    return (
        <>
            {
                user && users && chat ?
                    <div className={`${chat && selectedChat && chat._id === selectedChat._id ? 'cli-selected-chat' : ''} chat-list-item`} onClick={() => handleSelectedChat()}>
                        <div className='cli-image-container'>
                            <img src={url && url === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                DP : url} />
                        </div>
                        <div className='cli-chat-details'>
                            <div >
                                <div className='cli-chat-name'>
                                    {
                                        !chat.isGroupChat ? getOtherUser().name : chat.chatName
                                    }
                                </div>
                                <div className={`${chat && selectedChat && chat._id === selectedChat._id ? 'color-black' : ''} cli-chat-last-msg`} >
                                    {chat.latestMessage ? chat.latestMessage.content : <></>}
                                </div>
                            </div>
                            <div>
                                <div className={`${chat && selectedChat && chat._id === selectedChat._id ? 'color-black' : ''} cli-chat-time`}>
                                    {
                                        lastMsgTime ? lastMsgTime : <></>
                                    }
                                </div>
                                {
                                    count > 0 ?
                                        <div className='cli-chat-new-msg' >
                                            <div>
                                                {count}
                                            </div>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    : <></>
            }
        </>
    );
}

export default ChatListItem;