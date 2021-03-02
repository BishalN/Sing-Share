import axios from 'axios';

import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DATA_CLEAR,
  USER_FACEBOOK_LOGIN_FAIL,
  USER_FACEBOOK_LOGIN_REQUEST,
  USER_FACEBOOK_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
} from '../constants/userConstants';

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_DATA_CLEAR });
  dispatch({ type: USER_LOGOUT });
};

export const register = (
  fullName: string,
  username: string,
  email: string,
  password: string
) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users',
      { fullName, username, email, password },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const login = (usernameOrEmail: string, password: string) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/login',
      { usernameOrEmail, password },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/reset-password',
      { email },
      config
    );

    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const changePassword = (newPassword, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/change-password',
      { newPassword, token },
      config
    );

    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const facebookLogin = (userId, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: USER_FACEBOOK_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/facebook-login',
      { userId, accessToken },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_FACEBOOK_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FACEBOOK_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const googleLogin = (idToken) => async (dispatch) => {
  try {
    dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/google-login',
      { idToken },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_GOOGLE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateProfilePicture = (file) => async (dispatch) => {
  try {
    dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'https://singshare.herokuapp.com/api/users/upload-profilePicture',
      { file },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_GOOGLE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
