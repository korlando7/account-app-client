import Api from '../helper/api';
import * as actionTypes from './actionTypes';

const api = new Api();
// UI ACTIONS
export const setError = errorMessage => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR, errorMessage });
};

export const closeError = () => (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_ERROR });
};

export const setSuccess = successMessage => (dispatch) => {
  dispatch({ type: actionTypes.SET_SUCCESS, successMessage });
};

export const closeSuccess = () => (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_SUCCESS });
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
      if (res.statusCode > 299) {
        dispatch(setError(res.message));
      }
      dispatch({
        type: actionTypes.SET_USER,
      });
      dispatch(setSuccess(res.message));
    })
    .catch((err) => {
      dispatch(setError(err));
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
        dispatch(setError(res.message));
      }
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const authenticateUser = body => (dispatch) => {
  api.authenticateUser(body)
    .then((res) => {
      if (res.statusCode > 299) {
        dispatch(setError(res.message));
      } else {
        dispatch({
          type: actionTypes.AUTHENTICATE_USER,
          authenticated: true,
          user: res.userData,
        });
      }
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
};
