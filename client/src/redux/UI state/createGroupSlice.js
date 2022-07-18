import { createSlice } from '@reduxjs/toolkit';

const createGroupSlice = createSlice({
    name: 'createGroup',
    initialState: false,
    extraReducers: {
        CREATE_GROUP_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export const { CREATE_GROUP_TOGGLE } = createGroupSlice.actions;

export default createGroupSlice.reducer;
