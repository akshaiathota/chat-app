import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import userActionTypes from './userActionTypes';

const BASE_URI = 'http://localhost:5000/';

function* serverRequest(method, url, headers, data) {
    try {

        const response = yield axios({
            method,
            url,
            headers,
            data
        });
        if (response.status === 201) {
            yield put({ type: userActionTypes.SIGN_IN_SUCCESS, payload: response.data.data });
        }
    }
    catch (error) {
        yield put({ type: userActionTypes.SIGN_IN_FAILURE });
    }
}

function* signIn({ payload }) {
    const method = 'POST';
    const url = BASE_URI + 'user/login';
    const headers = {
        'Content-Type': 'application/json'
    };
    yield serverRequest(method, url, headers, payload);
}

export function* signInWithEmail() {
    yield takeLatest(userActionTypes.SIGN_IN_START, signIn);
}

export default function* userSaga() {
    yield all([
        call(signInWithEmail),
    ]);
}