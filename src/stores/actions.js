import Api from '../helper/api';
import * as actionTypes from './actionTypes';

const api = new Api();
// UI ACTIONS
export const setAlertMessage = (type, message) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ALERT, data: { type, message } });
};

export const closeAlertMessage = () => (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_ALERT });
};

// export const setLoading = loading => (dispatch) => {
//   dispatch({ type: actionTypes.SET_LOADING, loading });
// };

export const toggleLogin = () => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_LOGIN });
};

export const setToLogin = () => (dispatch) => {
  dispatch({ type: actionTypes.SET_TO_LOGIN });
};

// USER ACTIONS
export const createUser = body => (dispatch) => {
  api.createUser(body)
    .then((res) => {
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        dispatch({
          type: actionTypes.SET_USER,
        });
        dispatch(setAlertMessage('success', res.message));
      } else {
        dispatch(setAlertMessage('error', res.message));
      }
    })
    .catch((err) => {
      dispatch(setAlertMessage('error', err));
    });
};

export const searchUser = username => (dispatch) => {
  api.searchUser(username)
    .then((res) => {
      if (res.statusCode === 200) {
        dispatch({ type: actionTypes.SEARCH_USER, userValid: true });
      } else if (res.statusCode === 400) {
        dispatch({ type: actionTypes.SEARCH_USER, userValid: false });
      } else {
        dispatch(setAlertMessage('error', res.message));
      }
    })
    .catch((err) => {
      dispatch(setAlertMessage('error', err));
    });
};

export const authenticateUser = body => (dispatch) => {
  api.authenticateUser(body)
    .then((res) => {
      console.log(res.statusCode);
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        dispatch({
          type: actionTypes.AUTHENTICATE_USER,
          authenticated: true,
          user: res.userData,
        });
      } else {
        dispatch(setAlertMessage('error', res.message));
      }
    })
    .catch((err) => {
      dispatch(setAlertMessage('error', err));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
};
