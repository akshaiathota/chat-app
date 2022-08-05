import { takeLatest, put, call, all, select } from "redux-saga/effects";
import chatActionTypes from "./chatActionTypes";
import { accessChat, fetchChats, createGroupChat, renameGroup, addUser, removeUser } from '../../utils/httpRequests';
import getChats from "./chatSelector";
import selectedChatActionTypes from '../selectedChat/selectedChatActionTypes';


function* getChat({ payload: { id, token } }) {
    const response = yield accessChat(id, token);
    if (response.status === 'ok') {
        const { data } = response;
        const chats = yield select(getChats);
        const doesChatExists = chats.find((chat) => chat._id === data._id);
        if (!doesChatExists) {
            yield put({ type: chatActionTypes.ADD_NEW_CHAT, payload: data });
        }
    }
}

function* getAllChats({ payload: { token } }) {
    const response = yield fetchChats(token);
    if (response.status === 'ok') {
        const { data } = response;
        yield put({ type: chatActionTypes.SET_CHATS, payload: data });
    }
}

function* createNewUserGroupChat({ payload: { name, users, token } }) {
    const response = yield createGroupChat(name, users, token);
    if (response.status === 'ok') {
        const { data } = response;
        yield put({ type: chatActionTypes.ADD_NEW_CHAT, payload: data });
        yield put({ type: 'ADD_MEMBERS_NEW_GROUP_TOGGLE' });
        yield put({ type: chatActionTypes.CREATED_GROUP_SUCCESSFULLY, payload: data });
    }
}

function* renameExistingChat({ payload: { name, chatId, token } }) {
    const response = yield renameGroup(name, chatId, token);
    if (response.status === 'ok') {
        const { data } = response;
        const chats = yield select(getChats);
        const otherChats = chats.filter((ct) => ct._id !== data._id);
        const payload = {
            otherChats,
            newChat: data
        };
        yield put({ type: chatActionTypes.UPDATE_CHAT, payload: payload });
        yield put({ type: selectedChatActionTypes.SELECT_CHAT, payload: data });
        yield put({ type: 'RENAME_GROUP_TOGGLE' });
    }
}

function* addUserToGroup({ payload: { userId, chatId, token } }) {
    const response = yield addUser(userId, chatId, token);
    if (response.status === 'ok') {
        const { data } = response;
        const chats = yield select(getChats);
        const otherChats = chats.filter((ct) => ct._id !== data._id);
        const payload = {
            otherChats,
            newChat: data
        };
        yield put({ type: chatActionTypes.UPDATE_CHAT, payload: payload });
        yield put({ type: selectedChatActionTypes.SELECT_CHAT, payload: data });
        yield put({ type: 'ADD_MEMBERS_TOGGLE' });
    }
}

function* removeUserFromGroup({ payload: { userId, chatId, token } }) {
    const response = yield removeUser(userId, chatId, token);
    if (response.status === 'ok') {
        const { data } = response;
        const chats = yield select(getChats);
        const otherChats = chats.filter((ct) => ct._id !== data._id);
        const payload = {
            otherChats,
            newChat: data
        };
        yield put({ type: chatActionTypes.UPDATE_CHAT, payload: payload });
        yield put({ type: selectedChatActionTypes.SELECT_CHAT, payload: data });
        yield put({ type: 'REMOVE_MEMBERS_TOGGLE' });
    }
}

function* handleNewChat({ payload }) {
    const chats = yield select(getChats);
    const doesChatExists = chats.find((ct) => ct._id === payload.chat._id);
    if (!doesChatExists) {
        yield put({ type: chatActionTypes.ADD_NEW_CHAT, payload: payload.chat });
    }
    else {
        const otherChats = chats.filter((ct) => ct._id !== payload.chat._id);
        const newPayload = {
            otherChats,
            newChat: payload.chat
        };
        yield put({ type: chatActionTypes.UPDATE_CHAT, payload: newPayload });
    }
}

function* accessUserChat() {
    yield takeLatest(chatActionTypes.ACCESS_CHAT, getChat);
}

function* fetchUserChats() {
    yield takeLatest(chatActionTypes.FETCH_CHATS, getAllChats);
}

function* createUserGroupChat() {
    yield takeLatest(chatActionTypes.CREATE_GROUP_CHAT, createNewUserGroupChat);
}

function* renameUserGroup() {
    yield takeLatest(chatActionTypes.RENAME_GROUP, renameExistingChat);
}

function* addNewUser() {
    yield takeLatest(chatActionTypes.ADD_USER, addUserToGroup);
}

function* removeUserById() {
    yield takeLatest(chatActionTypes.REMOVE_USER, removeUserFromGroup);
}

function* newChatReceived() {
    yield takeLatest(chatActionTypes.NEW_CHAT, handleNewChat);
}

export default function* chatSaga() {
    yield all([
        call(accessUserChat),
        call(fetchUserChats),
        call(createUserGroupChat),
        call(renameUserGroup),
        call(addNewUser),
        call(removeUserById),
        call(newChatReceived)
    ]);
}