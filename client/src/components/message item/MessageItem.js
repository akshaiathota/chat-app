import React from 'react';
import './MessageItem.css';

function MessageItem({ message, senderName, leftOrRight, ref, isLoggedUser }) {
    return (
        <div className={`message-item ${leftOrRight}`} ref={ref}>
            <div className='mi-msg-details'>
                <h6>{isLoggedUser ? 'You' : senderName}</h6>
                <div className='mi-message-holder'>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default MessageItem