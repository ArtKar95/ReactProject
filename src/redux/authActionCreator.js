import { request, requestWithoutJwt } from "../Helpers/request";
import * as authActionTypes from "./authActionTypes";
import {
  saveJwt,
  removeJwt,
  loginRequest,
  registerRequest,
  getLocalJwt,
} from "../Helpers/auth";
import { history } from "../Helpers/history";

const apiUrl = process.env.REACT_APP_API_URL;

export const register = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      await registerRequest(data);

      dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
      });
      history.push("/login");
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      const token = await loginRequest(data);
      saveJwt(token);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
      });
      history.push("/");
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });

      const jwt = getLocalJwt();

      if (jwt) {
        await requestWithoutJwt(`${apiUrl}/user/sign-out`, "POST", {
          jwt: jwt,
        });
        removeJwt();
        dispatch({ type: authActionTypes.LOGOUT_SUCCESS });
        history.push("/");
      } else {
        dispatch({ type: authActionTypes.LOGOUT_SUCCESS });
        history.push("/");
      }
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      const userInfo = await request(`${apiUrl}/user`);
      dispatch({ type: authActionTypes.GET_USER_INFO, payload: userInfo });
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const sendMessage = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      await requestWithoutJwt(`${apiUrl}/form`, "POST", data);

      dispatch({ type: authActionTypes.SEND_MESSAGE });
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const updateUserInfo = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });

      const userInfo = await request(`${apiUrl}/user`, "PUT", data);

      dispatch({ type: authActionTypes.UPDATE_USER_INFO, payload: userInfo });
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const updateUserPassword = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });

      await request(`${apiUrl}/user/password`, "PUT", data);

      dispatch({
        type: authActionTypes.UPDATE_USER_PASSWORD,
      });
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};
