import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messageActionTypes from '../../redux/messages/messageActionTypes';
import getUserChat from '../../redux/messages/messageSelector';
import getSelectedChat from '../../redux/selectedChat/selectedChatSelector';
import { getLoggedUser } from '../../redux/user/userSelectors';
import MessageItem from '../message item/MessageItem';
import './Messages.css';

function Messages() {
    const selectedChat = useSelector(getSelectedChat);
    const user = useSelector(getLoggedUser);
    const messages = useSelector(getUserChat);
    const inputRef = useRef();
    const dispatch = useDispatch();

    function scrollToBottom() {
        let target = document.getElementsByClassName('m-ref-block');
        target[0].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && inputRef.current.value) {
            event.preventDefault();
            const payload = {
                text: inputRef.current.value,
                chatId: selectedChat._id,
                token: user.token
            };
            dispatch({ type: messageActionTypes.SEND_MESSAGE, payload: payload });
        }
    }

    function fetchMessages() {
        const payload = {
            chatId: selectedChat._id,
            token: user.token
        };
        dispatch({ type: messageActionTypes.GET_ALL_MESSAGES, payload: payload });
    }

    useEffect(() => {

    }, [user]);

    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='messages'>
            <div className='m-message-holder'>
                {
                    messages ? messages.map((message, idx) =>
                        <MessageItem
                            key={idx}
                            url={message.sender.pic}
                            message={message.content}
                            senderName={message.sender.name}
                            isLoggedUser={user._id === message.sender._id}
                            leftOrRight={message.sender._id === user._id ? 'right' : 'left'}
                        />)
                        : <></>
                }
                <div className='m-ref-block' >

                </div>
            </div>
            <form onKeyDown={handleKeyDown}>
                <div className='m-input-field'>
                    <textarea ref={inputRef} id='message-txt-area' />
                </div>
            </form>

        </div>
    )
}

export default Messages;