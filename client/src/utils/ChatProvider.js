import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        setUser(data);
        if (!data) {
            navigate('/');
        }
    }, [navigate]);
    return <ChatContext.Provider value={{
        user, setUser,
        selectedChat, setSelectedChat,
        chats, setChats,
    }}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;