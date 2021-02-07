import {
  USER_UPLOAD_RECORDING_FAIL,
  USER_UPLOAD_RECORDING_REQUEST,
  USER_UPLOAD_RECORDING_SUCCESS,
} from '../constants/recordingsConstants';
import axios from 'axios';

export const uploadRecording = (formdata) => async (dispatch, getState) => {
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
