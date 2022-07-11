import { all, call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, registerUser } from '../../utils/httpRequests';
import userActionTypes from './userActionTypes';


function* signIn({ payload }) {
    const response = yield loginUser(payload);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_IN_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.FAILURE });
    }
}

function* signUp({ payload }) {
    console.log(payload);
    const response = yield registerUser(payload);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_UP_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.FAILURE });
    }
}

export function* signInWithEmail() {
    yield takeLatest(userActionTypes.SIGN_IN_START, signIn);
}

export function* signUpWithEmail() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export default function* userSaga() {
    yield all([
        call(signInWithEmail),
        call(signUpWithEmail)
    ]);
}