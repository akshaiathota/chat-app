import React from 'react';
import './Layout.css';
import ChatList from './components/chat-list';

function Home(){
  return(
      <div className='home-page'>
         <ChatList />
          
          <div className='chat-window'>

          </div>

          <div className='about-chat-window'>
              
          </div>
      </div>
  );
}

export default Home;