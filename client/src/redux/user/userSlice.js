import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    extraReducers: {
        SIGN_IN_SUCCESS: (state, action) => {
            console.log(state);
            return {
                ...state,
                ...action.payload
            }
        },
        SIGN_UP_SUCCESS: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
});

export const { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } = userSlice.actions;

export default userSlice.reducer;