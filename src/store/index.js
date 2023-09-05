import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';
import createSagaMiddleware from '@redux-saga/core';
import { incrementWatcher } from '../saga/countSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  cash: cashReducer,
  customers: customerReducer,
});

// Так подключается thunk;
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(incrementWatcher);
