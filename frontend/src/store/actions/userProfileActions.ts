import axios from 'axios';

import {
  USER_GET_ALL_PROFILE_FAIL,
  USER_GET_ALL_PROFILE_REQUEST,
  USER_GET_ALL_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const getUserProfile = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_PROFILE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `https://singshare.herokuapp.com/api/users/${username}`,
      config
    );

    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUsersProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GET_ALL_PROFILE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `https://singshare.herokuapp.com/api/users/all`,
      config
    );

    dispatch({ type: USER_GET_ALL_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GET_ALL_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateProfile = ({ fullName, username, bio }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `https://singshare.herokuapp.com/api/users/edit`,
      { fullName, username, bio },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); //updating the userlogin reducer
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateProfilePicture = (formdata) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      `https://singshare.herokuapp.com/api/users/upload-profilePicture`,
      formdata,
      config
    );

    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_PICTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
