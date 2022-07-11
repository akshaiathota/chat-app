import { createSlice } from '@reduxjs/toolkit';
import chatActionTypes from './chatActionTypes';

const chatSlice = createSlice({
    name: 'chats',
    initialState: null,
    extraReducers: {
        [chatActionTypes.ADD_NEW_CHAT]: (state, action) => {
            const payload = action.payload;
            return {
                ...state,
                payload
            };
        },
        [chatActionTypes.UPDATE_CHAT]: (state, action) => {
            const { newChat } = action.payload;
            console.log(state);
            const otherchats = state.filter((ct) => ct._id !== newChat._id);
            return {
                newChat,
                ...otherchats
            };
        }
    }
});

export const { ADD_NEW_CHAT, UPDATE_CHAT } = chatSlice.actions;

export default chatSlice.reducer;