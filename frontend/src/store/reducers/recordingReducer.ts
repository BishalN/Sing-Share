import {
  COMMENT_RECORDING_FAIL,
  COMMENT_RECORDING_REQUEST,
  COMMENT_RECORDING_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_MY_RECORDING_FAIL,
  DELETE_MY_RECORDING_REQUEST,
  DELETE_MY_RECORDING_SUCCESS,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_MY_RECORDING_FAIL,
  EDIT_MY_RECORDING_REQUEST,
  EDIT_MY_RECORDING_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_MY_RECORDINGS_FAIL,
  GET_MY_RECORDINGS_REQUEST,
  GET_MY_RECORDINGS_SUCCESS,
  GET_POPULAR_RECORDINGS_FAIL,
  GET_POPULAR_RECORDINGS_REQUEST,
  GET_POPULAR_RECORDINGS_SUCCESS,
  GET_TOP_RECS_FAIL,
  GET_TOP_RECS_REQUEST,
  GET_TOP_RECS_SUCCESS,
  GET_USER_RECORDINGS_BY_USERNAME_FAIL,
  GET_USER_RECORDINGS_BY_USERNAME_REQUEST,
  GET_USER_RECORDINGS_BY_USERNAME_SUCCESS,
  LIKE_RECORDING_FAIL,
  LIKE_RECORDING_REQUEST,
  LIKE_RECORDING_SUCCESS,
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

export const getRecordingsByUsernameReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_RECORDINGS_BY_USERNAME_REQUEST:
      return { loading: true };
    case GET_USER_RECORDINGS_BY_USERNAME_SUCCESS:
      return {
        loading: false,
        recordings: action.payload,
        success: true,
      };
    case GET_USER_RECORDINGS_BY_USERNAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMyRecordingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_RECORDINGS_REQUEST:
      return { loading: true };
    case GET_MY_RECORDINGS_SUCCESS:
      return {
        loading: false,
        recordings: action.payload,
        success: true,
      };
    case GET_MY_RECORDINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editMyRecordingReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_MY_RECORDING_REQUEST:
      return { loading: true };
    case EDIT_MY_RECORDING_SUCCESS:
      return { loading: false, recordingInfo: action.payload };
    case EDIT_MY_RECORDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteMyRecordingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MY_RECORDING_REQUEST:
      return { loading: true };
    case DELETE_MY_RECORDING_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_MY_RECORDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likeRecordingReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_RECORDING_REQUEST:
      return { loading: true };
    case LIKE_RECORDING_SUCCESS:
      return { loading: false, likes: action.payload };
    case LIKE_RECORDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentRecordingReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_RECORDING_REQUEST:
      return { loading: true };
    case COMMENT_RECORDING_SUCCESS:
      return { loading: false, comment: action.payload };
    case COMMENT_RECORDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true };
    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_COMMENT_REQUEST:
      return { loading: true };
    case EDIT_COMMENT_SUCCESS:
      return { loading: false, editedComment: action.payload };
    case EDIT_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPopularRecordsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POPULAR_RECORDINGS_REQUEST:
      return { loading: true };
    case GET_POPULAR_RECORDINGS_SUCCESS:
      return { loading: false, recordings: action.payload };
    case GET_POPULAR_RECORDINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTopRecsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOP_RECS_REQUEST:
      return { loading: true };
    case GET_TOP_RECS_SUCCESS:
      return { loading: false, recordings: action.payload };
    case GET_TOP_RECS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
