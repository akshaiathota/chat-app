import { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);

    return <ChatContext.Provider value={{
        chats, setChats,
    }}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;