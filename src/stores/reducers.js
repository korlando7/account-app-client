import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const userInitialState = {
  user: {},
  authenticated: false,
  userValid: false,
};

const uiInitialState = {
  isLoading: false,
  isLogin: true,
  error: false,
  errorMessage: '',
};

export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return Object.assign({}, state, { user: action.data });
    case actionTypes.AUTHENTICATE_USER:
      return Object.assign({}, state, { authenticated: true });
    case actionTypes.LOGOUT:
      return Object.assign({}, state, userInitialState);
    default:
      return state;
  }
};

export const ui = (state = uiInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.data.loading });
    case actionTypes.TOGGLE_LOGIN:
      return Object.assign({}, state, { isLogin: !state.isLogin });
    case actionTypes.SET_TO_LOGIN:
      return Object.assign({}, state, { isLogin: true });
    case actionTypes.SET_ERROR:
      return Object.assign({}, state, {
        error: true,
        errorMessage: action.errorMessage,
      });
    case actionTypes.CLOSE_ERROR:
      return Object.assign({}, state, {
        error: false,
      });
    default:
      return state;
  }
};

const mainReducer = combineReducers({
  user,
  ui,
});

export default mainReducer;
