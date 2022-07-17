import { createSlice } from '@reduxjs/toolkit';
import messageActionTypes from './messageActionTypes';

const messageSlice = createSlice({
    name: 'messages',
    initialState: [],
    extraReducers: {
        [messageActionTypes.ADD_NEW_MESSAGE]: (state, action) => {
            return [...state, action.payload];
        },
        [messageActionTypes.SET_MESSAGES]: (state, action) => {
            return [...action.payload];
        }
    }
});

export default messageSlice.reducer;