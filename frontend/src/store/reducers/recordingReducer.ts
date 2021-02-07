import {
  USER_UPLOAD_RECORDING_FAIL,
  USER_UPLOAD_RECORDING_REQUEST,
  USER_UPLOAD_RECORDING_SUCCESS,
} from '../constants/recordingsConstants';

export const userUploadRecordingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPLOAD_RECORDING_REQUEST:
      return { loading: true };
    case USER_UPLOAD_RECORDING_SUCCESS:
      return {
        loading: false,
        recordingInfo: action.payload,
        success: true,
      };
    case USER_UPLOAD_RECORDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
