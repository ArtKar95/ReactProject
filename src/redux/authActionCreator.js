import request from "../Helpers/request";
import * as authActionTypes from "./authActionTypes";
import {
  saveJwt,
  removeJwt,
  getJwt,
  loginRequest,
  registerRequest,
} from "../Helpers/auth";
import { history } from "../Helpers/history";

const apiUrl = process.env.REACT_APP_API_URL;

export const register = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      const response = await registerRequest(data);

      dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
        payload: response._id,
      });
      history.push("/tasks");
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
      history.push("/tasks");
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.AUTH_LOADING });
      await request(`${apiUrl}/user/sign-out`, "POST", { jwt: await getJwt() });
      removeJwt();
      dispatch({
        type: authActionTypes.LOGOUT_SUCCESS,
      });
      history.push("/");
    } catch (err) {
      dispatch({ type: authActionTypes.AUTH_FAILURE, payload: err.message });
    }
  };
};
