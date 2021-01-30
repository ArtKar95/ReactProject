import * as authActionTypes from "./authActionTypes";
import { checkLoginStatus } from "../Helpers/auth";
import { LOADING } from "./taskActionTypes";

const initState = {
  isAuthenticated: checkLoginStatus(),
  userInfo: null,
  loading: false,
  successMessage: null,
  error: null,
  sendMessageSuccess: false,
  updateUserInfoSuccess: false,
};

const authReduser = (state = initState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
    sendMessageSuccess: false,
    updateUserInfoSuccess: false,
  };

  switch (action.type) {
    case authActionTypes.AUTH_LOADING:
      return loadingState;

    case LOADING: {
      return {
        ...state,
        error: null,
        successMessage: null,
      };
    }

    case authActionTypes.AUTH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case authActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: "🎉🎉🎉Welcome🎉🎉🎉",
      };
    }

    case authActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    }
    case authActionTypes.LOGOUT_SUCCESS: {
      return {
        ...initState,
        isAuthenticated: false,
      };
    }

    case authActionTypes.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    }

    case authActionTypes.SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: "Thanks for the message",
        sendMessageSuccess: true,
      };
    }

    case authActionTypes.UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        successMessage: "Changed successfully",
        updateUserInfoSuccess: true,
      };
    }

    case authActionTypes.UPDATE_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: "Password changed successfully",
      };
    }

    default:
      return state;
  }
};

export default authReduser;
