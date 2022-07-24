import { createSlice } from '@reduxjs/toolkit';
import chatActionTypes from './chatActionTypes';

const chatSlice = createSlice({
    name: 'chats',
    initialState: [],
    extraReducers: {
        [chatActionTypes.ADD_NEW_CHAT]: (state, action) => {
            const payload = action.payload;
            return [...state, payload];
        },
        [chatActionTypes.UPDATE_CHAT]: (state, action) => {
            const { otherChats, newChat } = action.payload;
            return [newChat, ...otherChats];
        },
        [chatActionTypes.SET_CHATS]: (state, action) => {
            return [...action.payload]
        }
    }
});

export default chatSlice.reducer;