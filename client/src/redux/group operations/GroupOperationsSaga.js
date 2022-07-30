import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { searchUserByName } from '../../utils/httpRequests';
import groupOperationsActionTypes from './GroupOperationsActionTypes';

function* updateSearch(data) {
    const existingIds = yield select(state => state.groupOperations.existingIds);
    const list = new Set(existingIds);
    const updatedResult = data.filter((usr) => !list.has(usr._id));
    yield put({ type: groupOperationsActionTypes.SET_SEARCH_RESULT, payload: updatedResult });
}

function* searchUser({ payload: { search, token } }) {
    const response = yield searchUserByName(search, token);
    if (response && response.status === 'ok') {
        yield updateSearch(response.data);
    }
}

function* addToSelectedUsers({ payload }) {
    const existingIds = yield select(state => state.groupOperations.existingIds);
    const set = existingIds ? new Set(existingIds) : new Set();
    if (set.has(payload._id)) {
        return;
    }
    else {
        yield put({ type: groupOperationsActionTypes.ADD_TO_SELECTED_USERS, payload });
        yield put({ type: groupOperationsActionTypes.ADD_TO_EXISTING_ID, payload: payload._id });
        const searchResult = yield select(state => state.groupOperations.searchResult);
        yield updateSearch(searchResult);
    }
}

function* removeFromSelectedUser({ payload }) {
    const selectedUsers = yield select(state => state.groupOperations.selectedUsers);
    const existingIds = yield select(state => state.groupOperations.existingIds);
    const updatedList = selectedUsers.filter((usr) => usr._id !== payload._id);
    const newExistingIds = existingIds.filter((id) => id !== payload._id);
    yield put({ type: groupOperationsActionTypes.SET_SELECTED_USERS, payload: updatedList });
    yield put({ type: groupOperationsActionTypes.SET_EXISTING_IDS, payload: newExistingIds });
    const searchResult = yield select(state => state.groupOperations.searchResult);
    const updatedSearchResult = [...searchResult, payload];
    yield put({ type: groupOperationsActionTypes.SET_SEARCH_RESULT, payload: updatedSearchResult });
}

function* search() {
    yield takeLatest(groupOperationsActionTypes.SEARCH_USER_WITH_NAME, searchUser);
}

function* addUser() {
    yield takeLatest(groupOperationsActionTypes.ADD_SELECTED_USER, addToSelectedUsers);
}

function* removeUser() {
    yield takeLatest(groupOperationsActionTypes.REMOVE_SELECTED_USER, removeFromSelectedUser);
}

export default function* groupOperationsSaga() {
    yield all([
        call(search),
        call(addUser),
        call(removeUser)
    ])
};