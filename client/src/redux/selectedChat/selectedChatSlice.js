import { createSlice } from '@reduxjs/toolkit';
import selectedChatActionTypes from './selectedChatActionTypes';

export const selectedChatSlice = createSlice({
    name: 'selectedChat',
    initialState: null,
    extraReducers: {
        [selectedChatActionTypes.UPDATE_SELECTED_CHAT]: (state, action) => {
            return action.payload;
        }
    }
});

export const { SELECT_CHAT } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;