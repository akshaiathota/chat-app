import React from 'react';
import './ChatWindow.css';

function ChatWindow() {
  return (
    <div className='chat-window'>
      <div className='cw-header'>
        <div >
          <h4>Chat name</h4>
        </div>
        <div>
          <h6>Last Seen</h6>
        </div>
      </div>
      <div className='cw-chat'>

      </div>
      <div className='cw-input-field'>
        <textarea />
      </div>
    </div>
  )
}

export default ChatWindow;