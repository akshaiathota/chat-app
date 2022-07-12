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
            const { otherchats, newChat } = action.payload;
            return [newChat, ...otherchats];
        },
        [chatActionTypes.SET_CHATS]: (state, action) => {
            return [...action.payload]
        }
    }
});

export const { ADD_NEW_CHAT, UPDATE_CHAT } = chatSlice.actions;

export default chatSlice.reducer;