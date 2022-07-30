import { createSlice } from '@reduxjs/toolkit';

const removeMembersSlice = createSlice({
    name: 'removeMembers',
    initialState: false,
    extraReducers: {
        REMOVE_MEMBERS_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export default removeMembersSlice.reducer;
