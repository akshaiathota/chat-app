import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import messageActionTypes from '../messages/messageActionTypes';
import { getLoggedUser } from '../user/userSelectors';
import selectedChatActionTypes from './selectedChatActionTypes';

function* checkMessageForMarking({ payload }) {
    const user = yield select(getLoggedUser);
    if (payload && payload.unread) {
        console.log(payload.unread[0].user._id + " " + user._id);
        const messages = payload.unread[0].user._id === user._id ? payload.unread[0].messages : payload.unread[1].messages;
        console.log(payload.unread[0].messages);
        console.log(payload.unread[1].messages);
        console.log(messages);
        if (messages.length <= 0) {
            return;
        }
        const data = {
            messageIds: messages,
            chatId: payload._id,
            token: user.token
        }
        yield put({ type: messageActionTypes.MARK_MESSAGES_SEEN, payload: data });
    }
}

function* updateSelectedChat({ payload }) {
    yield put({ type: selectedChatActionTypes.UPDATE_SELECTED_CHAT, payload: payload });
    const obj = {
        payload
    };
    yield checkMessageForMarking(obj);
}

function* selectChat() {
    yield takeLatest(selectedChatActionTypes.SELECT_CHAT, updateSelectedChat);
}

function* checkMessage() {
    yield takeLatest(selectedChatActionTypes.CHECK_MESSAGE, checkMessageForMarking);
}

export default function* selectedChatSaga() {
    yield all([
        call(selectChat),
        call(checkMessage)
    ]);
};