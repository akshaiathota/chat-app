import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import selectedChat from './selectedChat/selectedChatSlice';
import chatReducer from './chats/chatSlice';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    user: userReducer,
    selectedChat: selectedChat,
    chats: chatReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    middleware: [logger, sagaMiddleware],
    reducer: persistedReducer
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };