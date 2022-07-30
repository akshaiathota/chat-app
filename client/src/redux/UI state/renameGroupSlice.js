import { createSlice } from '@reduxjs/toolkit';

const renameGroupSlice = createSlice({
    name: 'renameGroup',
    initialState: false,
    extraReducers: {
        RENAME_GROUP_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export default renameGroupSlice.reducer;
