import {createStore, applyMiddleware} from 'redux';
import reduxMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(reduxMiddleware));

export default store;
