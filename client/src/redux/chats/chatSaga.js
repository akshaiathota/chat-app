import { takeLatest, put, call, all, select } from "redux-saga/effects";
import chatActionTypes from "./chatActionTypes";
import { accessChat } from '../../utils/httpRequests';
import getChats from "./chatSelector";


function* getChat({ payload: { id, token } }) {
    const response = yield accessChat(id, token);
    if (response.status === 'ok') {
        const { data } = response;
        const chats = yield select(getChats);
        const doesChatExists = chats.find((chat) => chat._id === data._id);
        console.log(doesChatExists);
        if (!doesChatExists) {
            yield put({ type: chatActionTypes.ADD_NEW_CHAT, payload: data });
        }
    }
}

function* accessChat() {
    yield takeLatest(chatActionTypes.ACCESS_CHAT, getChat);
}

export default function* chatSaga() {
    yield all[
        call(accessChat)
    ]
}