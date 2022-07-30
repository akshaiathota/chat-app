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
        const hours = time.getHours();
        const minutes = time.getMinutes();
        lastMsgTime = (hours.toString().length === 1 ? '0' + hours : hours) + ':' + (minutes.toString().length === 1 ? '0' + minutes : minutes);
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
    }, [count, chat, user]);

    return (
        <>
            {
                user && users && chat ?
                    <div className={`${chat && selectedChat && chat._id === selectedChat._id ? 'cli-selected-chat' : ''} chat-list-item`} onClick={() => handleSelectedChat()}>
                        <div className='cli-image-container'>
                            <img src={url && url === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                DP : url} alt='Profile' />
                        </div>
                        <table className='cli-chat-details'>
                            <tbody>

                                <tr >
                                    <td style={{ width: '80%' }} className='cli-chat-name'>
                                        {
                                            !chat.isGroupChat ? getOtherUser().name : chat.chatName
                                        }
                                    </td>
                                    <td style={{ width: '20%' }} className={`${chat && selectedChat && chat._id === selectedChat._id ? 'color-black' : ''} cli-chat-time`}>
                                        {
                                            lastMsgTime ? lastMsgTime : <></>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '80%' }} className={`${chat && selectedChat && chat._id === selectedChat._id ? 'color-black' : ''} cli-chat-last-msg`} >
                                        <div style={{ height: '25px', lineHeight: '25px' }}>
                                            {chat.latestMessage ? (chat.latestMessage.sender._id === user._id) ? 'You: ' + chat.latestMessage.content : chat.latestMessage.sender.name.charAt(0).toUpperCase() + chat.latestMessage.sender.name.slice(1) + ': ' + chat.latestMessage.content : <></>}
                                        </div>
                                    </td>
                                    <td style={{ width: '20%' }} >
                                        {
                                            count > 0 ?
                                                <div className='cli-chat-new-msg' >
                                                    {count}
                                                </div>
                                                : <></>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    : <></>
            }
        </>
    );
}

export default ChatListItem;