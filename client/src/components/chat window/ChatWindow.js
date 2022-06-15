import React from 'react';
import './ChatWindow.css';

function ChatWindow() {
  return (
    <div className='chat-window'>
        <div className='cw-header'>
            <img alt='grp icon' />
            <h1>Thunder Buddies</h1>
        </div>
        <div className='cw-chat'>

        </div>
        <div className='cw-input-field'>
            <textarea />
        </div>
    </div>
  )
}

export default ChatWindow