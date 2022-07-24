import { createSlice } from '@reduxjs/toolkit';
import userStatusActionTypes from './usersStatusActionTypes';

const usersStatusSlice = createSlice({
    name: 'usersStatus',
    initialState: {},
    extraReducers: {
        [userStatusActionTypes.SET_USER_STATUS]: (state, action) => {
            return {
                ...state,
                [action.payload.id]: action.payload.status
            }
        }
    }
});

export default usersStatusSlice.reducer;