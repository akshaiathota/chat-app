import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware(), logger, sagaMiddleware]
    },
    reducer: {
        user: userReducer
    }
});

sagaMiddleware.run(rootSaga);


export default store;