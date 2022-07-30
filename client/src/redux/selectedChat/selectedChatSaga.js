import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import messageActionTypes from '../messages/messageActionTypes';
import { getLoggedUser } from '../user/userSelectors';
import userStatusActionTypes from '../usersStatus/usersStatusActionTypes';
import selectedChatActionTypes from './selectedChatActionTypes';
import getSelectedChat from './selectedChatSelector';

function* checkMessageForMarking({ payload }) {
    const user = yield select(getLoggedUser);
    if (payload && payload.unread) {
        for (let obj of payload.unread) {
            const messages = obj.messages;
            if (messages.length !== 0 && obj.user._id === user._id) {
                const data = {
                    messageIds: messages,
                    chatId: payload._id,
                    token: user.token
                }
                yield put({ type: messageActionTypes.MARK_MESSAGES_SEEN, payload: data });
            }
        }
    }
}

function getOtherUser(users, user) {
    if (!user || !users) {
        return null;
    }
    if (users.length === 1) {
        return;
    }
    return users[0]._id === user._id ? users[1] : users[0];
}

function* updateSelectedChat({ payload }) {
    yield put({ type: selectedChatActionTypes.UPDATE_SELECTED_CHAT, payload: payload });
    if (payload && !payload.isGroupChat) {
        const selectedChat = yield select(getSelectedChat);
        const user = yield select(getLoggedUser);
        const usersStatus = yield select(state => state.usersStatus);
        const otherUser = getOtherUser(selectedChat.users, user);
        if (usersStatus[otherUser._id] === undefined) {
            const payload = {
                id: otherUser._id
            }
            yield put({ type: userStatusActionTypes.FIND_USER_STATUS, payload: payload });
        }
    }
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