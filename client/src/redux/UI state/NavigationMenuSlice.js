import { createSlice } from '@reduxjs/toolkit';

const navigationMenuSlice = createSlice({
    name: 'navMenu',
    initialState: false,
    extraReducers: {
        NAV_MENU_TOGGLE: (state, action) => {
            return !state;
        }
    }
});

export const { NAV_MENU_TOGGLE } = navigationMenuSlice.actions;

export default navigationMenuSlice.reducer;
