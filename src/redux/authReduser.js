import * as authActionTypes from "./authActionTypes";
import { checkLoginStatus } from "../Helpers/auth";

const initState = {
  userId: null,
  isAuthenticated: checkLoginStatus(),
};

const authReduser = (state = initState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case authActionTypes.AUTH_LOADING:
      return loadingState;

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
        isAuthenticated: true,
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
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    }

    default:
      return state;
  }
};

export default authReduser;
