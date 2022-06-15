import React, { useEffect, useState } from 'react';
import '../Layout.css';

import ChatList from '../components/chat-list';
import ChatWindow from '../components/chat window/ChatWindow';

function HomePage(){
    const [data,setData] =useState([]);
    
    // useEffect(()=>{
    //     const userData=async function(){
    //     const {data}=await axios('http://localhost:5000/app/chat');
    //     console.log(data);
    //     setData(data);
    //     }
    //     userData();
    // },[]);
  return(
      <div className='home-page'>
         <div className='chat-list'>
             <ChatList />
         </div>
          
             <ChatWindow />

          <div className='about-chat-window'>
              
          </div>
      </div>
  );
}

export default HomePage;
