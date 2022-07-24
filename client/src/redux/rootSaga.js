import { call, all } from 'redux-saga/effects';
import chatSaga from './chats/chatSaga';
import messageSaga from './messages/messageSaga';
import selectedChatSaga from './selectedChat/selectedChatSaga';
import userSaga from './user/userSaga';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(chatSaga),
        call(messageSaga),
        call(selectedChatSaga)
    ])
};