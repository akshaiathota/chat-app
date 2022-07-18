import { createSlice } from '@reduxjs/toolkit';

const addMembersSlice = createSlice({
    name: 'addMembers',
    initialState: false,
    extraReducers: {
        ADD_MEMBERS_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export const { ADD_MEMBERS_TOGGLE } = addMembersSlice.actions;

export default addMembersSlice.reducer;
