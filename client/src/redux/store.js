import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    user: userReducer
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