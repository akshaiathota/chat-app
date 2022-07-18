import { createSlice } from '@reduxjs/toolkit';

const globalSearchSlice = createSlice({
    name: 'globalSearch',
    initialState: false,
    extraReducers: {
        GLOBAL_SEARCH_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export const { GLOBAL_SEARCH_TOGGLE } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;
