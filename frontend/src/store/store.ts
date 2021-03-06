import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
  userChangePasswordReducer,
  userFacebookLoginReducer,
  userGoogleLoginReducer,
  getUserProfileReducer,
  getUsersProfileReducer,
  userUpdateProfileReducer,
  userUpdateProfilePictureReducer,
  getUserByUserIdReducer,
} from './reducers/userReducer';

import {
  userUploadRecordingReducer,
  getMyRecordingsReducer,
  getRecordingsByUsernameReducer,
  deleteMyRecordingReducer,
  editMyRecordingReducer,
  commentRecordingReducer,
  likeRecordingReducer,
  getCommentsReducer,
  deleteCommentReducer,
  editCommentReducer,
  getPopularRecordsReducer,
  getTopRecsReducer,
} from './reducers/recordingReducer';

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userResetPassword: userResetPasswordReducer,
  userChangePassword: userChangePasswordReducer,
  userFacebookLogin: userFacebookLoginReducer,
  userGoogleLogin: userGoogleLoginReducer,
  getUserProfile: getUserProfileReducer,
  getUsersProfile: getUsersProfileReducer,
  getUserByUserId: getUserByUserIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateProfilePicture: userUpdateProfilePictureReducer,
  userUploadRecording: userUploadRecordingReducer,
  getMyRecordings: getMyRecordingsReducer,
  getRecordingsByUsername: getRecordingsByUsernameReducer,
  deleteMyRecording: deleteMyRecordingReducer,
  editMyRecording: editMyRecordingReducer,
  commentRecording: commentRecordingReducer,
  likeRecording: likeRecordingReducer,
  getComments: getCommentsReducer,
  editComment: editCommentReducer,
  deleteComment: deleteCommentReducer,
  getPopularRecords: getPopularRecordsReducer,
  getTopRecs: getTopRecsReducer,
});

let userInfoFromLocalStorage;
if (typeof window !== 'undefined') {
  userInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [];
}

const initialState: any = { userLogin: { userInfo: userInfoFromLocalStorage } };

const middleware = [thunk];

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
