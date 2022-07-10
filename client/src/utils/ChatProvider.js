import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
    // const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    // const [socket, setSocket] = useState(null);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('userData'));
    //     setUser(data);
    //     if (!data) {
    //         navigate('/');
    //     }

    // }, [navigate]);

    // useEffect(() => {
    //     const newSocket = io(ENDPOINT);
    //     newSocket.emit('setup', user);
    //     setSocket(newSocket);
    //     return () => {
    //         newSocket.close();
    //     }
    // }, [setSocket]);

    return <ChatContext.Provider value={{
        selectedChat, setSelectedChat,
        chats, setChats,
        // socket, setSocket
    }}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;