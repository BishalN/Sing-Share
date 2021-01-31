import axios from 'axios';

import {
  USER_GET_ALL_PROFILE_FAIL,
  USER_GET_ALL_PROFILE_REQUEST,
  USER_GET_ALL_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
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
      `http://localhost:4000/api/users/${username}`,
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
      `http://localhost:4000/api/users/all`,
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
