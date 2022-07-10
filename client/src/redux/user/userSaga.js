import { all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import userActionTypes from './userActionTypes';

const BASE_URI = 'http://localhost:5000/';

function* signIn({ payload: { inputData } }) {
    console.log(inputData);
    try {
        const method = 'POST';
        const url = BASE_URI + 'user/login';
        const headers = {
            'Content-Type': 'application/json'
        };
        const { response } = yield axios({
            method,
            url,
            headers,
            inputData
        });
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
}

function* signInWithEmail() {
    console.log('in function');
    takeLatest(userActionTypes.SIGN_IN_SUCCESS, signIn);
}

export default function* userSaga() {
    yield all([
        call(signInWithEmail)
    ]);
}