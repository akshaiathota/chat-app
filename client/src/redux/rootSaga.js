import { call, all } from 'redux-saga/effects';
import chatSaga from './chats/chatSaga';
import userSaga from './user/userSaga';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(chatSaga),
    ])
};