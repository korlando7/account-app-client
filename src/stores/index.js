import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducers';

const initialState = mainReducer(undefined, {});

console.log(initialState);
export default createStore(mainReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
