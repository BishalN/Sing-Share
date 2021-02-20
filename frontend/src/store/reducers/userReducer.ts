import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DATA_CLEAR,
  USER_FACEBOOK_LOGIN_FAIL,
  USER_FACEBOOK_LOGIN_REQUEST,
  USER_FACEBOOK_LOGIN_SUCCESS,
  USER_GET_ALL_PROFILE_FAIL,
  USER_GET_ALL_PROFILE_REQUEST,
  USER_GET_ALL_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_GET_PROFILE_RESET,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  GET_USER_BY_USERID_REQUEST,
  GET_USER_BY_USERID_SUCCESS,
  GET_USER_BY_USERID_FAIL,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, status: action.payload };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userFacebookLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FACEBOOK_LOGIN_REQUEST:
      return { loading: true };
    case USER_FACEBOOK_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_FACEBOOK_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userGoogleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GOOGLE_LOGIN_REQUEST:
      return { loading: true };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_GOOGLE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DATA_CLEAR:
      return { userInfo: null };
    default:
      return state;
  }
};

export const getUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_PROFILE_REQUEST:
      return { loading: true };
    case USER_GET_PROFILE_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case USER_GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUsersProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ALL_PROFILE_REQUEST:
      return { loading: true };
    case USER_GET_ALL_PROFILE_SUCCESS:
      return { loading: false, userProfiles: action.payload };
    case USER_GET_ALL_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_PICTURE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_PICTURE_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case USER_UPDATE_PROFILE_PICTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_BY_USERID_REQUEST:
      return { loading: true };
    case GET_USER_BY_USERID_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_BY_USERID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
