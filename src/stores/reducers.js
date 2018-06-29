import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const userInitialState = {
  user: {},
  authenticated: false,
  userValid: false,
  emailValid: false,
};

const uiInitialState = {
  isLoading: false,
  isLogin: true,
  alert: false,
  alertType: 'error',
  alertMessage: '',
};

export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return Object.assign({}, state, { user: action.data });
    case actionTypes.AUTHENTICATE_USER:
      return Object.assign({}, state, { authenticated: true });
    case actionTypes.LOGOUT:
      return Object.assign({}, state, userInitialState);
    case actionTypes.SEARCH_USER:
      return Object.assign({}, state, { userValid: action.userValid });
    case actionTypes.SEARCH_EMAIL:
      return Object.assign({}, state, { emailValid: action.emailValid });
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
    case actionTypes.SET_ALERT:
      return Object.assign({}, state, {
        alert: true,
        alertType: action.data.type,
        alertMessage: action.data.message,
      });
    case actionTypes.CLOSE_ALERT:
      return Object.assign({}, state, {
        alert: false,
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
