import { createSlice } from '@reduxjs/toolkit';
import groupOperationsActionTypes from './GroupOperationsActionTypes';

const groupOperationsSlice = createSlice({
    name: 'groupOperations',
    initialState: {
        'searchResult': [],
        'selectedUsers': [],
        'existingIds': []
    },
    extraReducers: {
        [groupOperationsActionTypes.SET_SEARCH_RESULT]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    'searchResult': action.payload
                }
            }
            return state;
        },
        [groupOperationsActionTypes.SET_SELECTED_USERS]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    'selectedUsers': action.payload
                };
            }
            return state;
        },
        [groupOperationsActionTypes.ADD_TO_SELECTED_USERS]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    'selectedUsers': [...state.selectedUsers, action.payload]
                };
            }
            return state;
        },
        [groupOperationsActionTypes.SET_EXISTING_IDS]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    'existingIds': !action.payload ? [] : action.payload
                }
            }
            return state;
        },
        [groupOperationsActionTypes.ADD_TO_EXISTING_ID]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    'existingIds': [...state.existingIds, action.payload]
                }
            }
            return state;
        },
        [groupOperationsActionTypes.CLEAR_GROUP_OPERATIONS_DATA]: (state, action) => {
            return {
                'searchResult': [],
                'selectedUsers': [],
                'existingIds': []
            }
        }
    }
});

export default groupOperationsSlice.reducer;