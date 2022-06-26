import React, { useEffect, useRef, useState } from 'react';
import { ChatState } from '../../utils/ChatProvider';
import { getAllMessages, sendMessage } from '../../utils/httpRequests';
import MessageItem from '../message item/MessageItem';
import './Messages.css';

function Messages() {
    const { user, selectedChat } = ChatState();
    const [messages, setMessages] = useState();
    const inputRef = useRef();
    const messagesEndRef = useRef();

    function scrollToBottom() {
        let target = document.getElementsByClassName('m-ref-block');
        // console.log(target);
        //target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
        target[0].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    async function handleKeyDown(event) {
        if (event.key === 'Enter' && inputRef.current.value) {
            event.preventDefault();
            console.log('sending message');
            const response = await sendMessage(inputRef.current.value, selectedChat._id, user.token);
            if (response && response.data) {
                inputRef.current.value = '';
                setMessages([...messages, response.data]);
            }
            console.log(response);
            console.log(messages);
        }
    }

    async function fetchMessages() {
        const response = await getAllMessages(selectedChat._id, user.token);
        console.log(response);
        if (response && response.data)
            setMessages(response.data);
    }

    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, [selectedChat])

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className='messages'>
            <div className='m-message-holder'>
                {
                    messages ? messages.map((message) =>
                        <MessageItem
                            url={message.sender.pic}
                            message={message.content}
                            senderName={message.sender.name}
                            leftOrRight={message.sender._id === user._id ? 'right' : 'left'}
                        />)
                        : <></>
                }
                <div className='m-ref-block' >

                </div>
            </div>
            <form onKeyDown={handleKeyDown}>
                <div className='m-input-field'>
                    <textarea ref={inputRef} />
                </div>
            </form>

        </div>
    )
}

export default Messages;