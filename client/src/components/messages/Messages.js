import React, { useEffect, useRef, useState } from 'react';
import { ChatState } from '../../utils/ChatProvider';
import { getAllMessages, sendMessage } from '../../utils/httpRequests';
import MessageItem from '../message item/MessageItem';
import './Messages.css';

function Messages({ socket }) {
    const { user, selectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

    function scrollToBottom() {
        let target = document.getElementsByClassName('m-ref-block');
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
                console.log('emitting new message to backend');
                await socket.emit('new message', response.data);
                setMessages([...messages, response.data]);
            }
            console.log(response);
            //console.log(messages);
        }
    }

    async function fetchMessages() {
        const response = await getAllMessages(selectedChat._id, user.token);
        console.log(response);
        if (response && response.data) {
            setMessages(response.data);
            socket.emit('join chat', selectedChat._id)
            console.log(selectedChat._id);
        }
    }

    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    useEffect(() => {
        socket.on('message received', (msg) => {
            setMessages((prev) => {
                return [...prev, msg];
            })
        });
    }, []);

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