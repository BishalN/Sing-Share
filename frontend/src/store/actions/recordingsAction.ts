import {
  DELETE_MY_RECORDING_FAIL,
  DELETE_MY_RECORDING_REQUEST,
  DELETE_MY_RECORDING_SUCCESS,
  EDIT_MY_RECORDING_FAIL,
  EDIT_MY_RECORDING_REQUEST,
  EDIT_MY_RECORDING_SUCCESS,
  GET_MY_RECORDINGS_FAIL,
  GET_MY_RECORDINGS_REQUEST,
  GET_MY_RECORDINGS_SUCCESS,
  GET_USER_RECORDINGS_BY_USERNAME_FAIL,
  GET_USER_RECORDINGS_BY_USERNAME_REQUEST,
  GET_USER_RECORDINGS_BY_USERNAME_SUCCESS,
  USER_UPLOAD_RECORDING_FAIL,
  USER_UPLOAD_RECORDING_REQUEST,
  USER_UPLOAD_RECORDING_SUCCESS,
} from '../constants/recordingsConstants';
import axios from 'axios';

export const uploadRecording = (formdata: FormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_UPLOAD_RECORDING_REQUEST });

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
      `http://localhost:4000/api/recordings/upload`,
      formdata,
      config
    );

    dispatch({ type: USER_UPLOAD_RECORDING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPLOAD_RECORDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getRecordingsByUsername = (username: string) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: GET_USER_RECORDINGS_BY_USERNAME_REQUEST });

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
      `http://localhost:4000/api/recordings/${username}`,
      config
    );

    dispatch({ type: GET_USER_RECORDINGS_BY_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_RECORDINGS_BY_USERNAME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getMyRecordings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_RECORDINGS_REQUEST });

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
      `http://localhost:4000/api/recordings/my`,
      config
    );

    dispatch({ type: GET_MY_RECORDINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_RECORDINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const editMyRecording = (recordingObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_MY_RECORDING_REQUEST });

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
      `http://localhost:4000/api/recordings/edit`,
      recordingObj,
      config
    );

    dispatch({ type: EDIT_MY_RECORDING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EDIT_MY_RECORDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteMyRecording = (recordingId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_MY_RECORDING_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        recordingid: recordingId,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/recordings/edit`,
      config
    );

    dispatch({ type: DELETE_MY_RECORDING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_MY_RECORDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
