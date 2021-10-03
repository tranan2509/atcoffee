import themeReducer from './themeReducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(themeReducer, applyMiddleware(thunk));

export default store;
