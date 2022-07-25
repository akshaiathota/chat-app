import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import selectedChat from './selectedChat/selectedChatSlice';
import chatReducer from './chats/chatSlice';
import messageReducer from './messages/messageSlice';
import navMenuReducer from './UI state/NavigationMenuSlice';
import globalSearchReducer from './UI state/globalSearchSlice';
import addMembersReducer from './UI state/addMembersSlice';
import createGroupReducer from './UI state/createGroupSlice';
import usersStatusReducer from './usersStatus/usersStatusSlice';
import groupOperationsReducer from './group operations/GroupOperationsSlice';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import socketMiddleware from './socket/socketMiddleware';
import userActionTypes from './user/userActionTypes';

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
    user: userReducer,
    selectedChat: selectedChat,
    chats: chatReducer,
    messages: messageReducer,
    navMenu: navMenuReducer,
    globalSearch: globalSearchReducer,
    addMembers: addMembersReducer,
    createGroup: createGroupReducer,
    usersStatus: usersStatusReducer,
    groupOperations: groupOperationsReducer
});

const rootReducer = (state, action) => {
    if (action.type === userActionTypes.SIGN_OUT) {
        state = undefined;
        storage.removeItem('persist:root');
    }
    return combinedReducers(state, action);
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    middleware: [logger, sagaMiddleware, socketMiddleware()],
    reducer: persistedReducer
});


sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };