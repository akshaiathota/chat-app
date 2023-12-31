import React, { useEffect, useRef, useState } from 'react';
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
    const [prevChatId, setPrevChatId] = useState("");

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

    useEffect(() => {
        function fetchMessages() {
            const payload = {
                chatId: selectedChat._id,
                token: user.token
            };
            dispatch({ type: messageActionTypes.GET_ALL_MESSAGES, payload: payload });
        }
        if (selectedChat && selectedChat._id !== prevChatId) {
            setPrevChatId(selectedChat._id);
            fetchMessages();
        }
    }, [selectedChat, prevChatId, user, dispatch]);

    useEffect(() => {
    }, [messages]);

    return (
        <div className='messages'>
            <div className='m-message-holder'>
                {
                    messages ? messages.slice(0).reverse().map((message) =>
                        <MessageItem
                            key={message._id}
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
                    <textarea placeholder='Enter Your Message....' ref={inputRef} id='message-txt-area' />
                </div>
            </form>

        </div>
    )
}

export default Messages;