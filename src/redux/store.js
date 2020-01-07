import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './rootReducer';

const middlewares = [logger, promiseMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;