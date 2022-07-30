import { createSlice } from '@reduxjs/toolkit';

const addMembersNewGroupSlice = createSlice({
    name: 'addMembersNewGroup',
    initialState: false,
    extraReducers: {
        ADD_MEMBERS_NEW_GROUP_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export default addMembersNewGroupSlice.reducer;
