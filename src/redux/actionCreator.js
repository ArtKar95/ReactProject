import request from "../Helpers/request";
import * as actionTypes from "./actionTypes";

const apiUrl = process.env.REACT_APP_API_URL;
export const showLoading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const showAlert = (text) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SHOW_ALERT, payload: text });
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };
};

export const hideAlert = () => {
  return {
    type: actionTypes.HIDE_ALERT,
  };
};

export const getTasks = (params = {}) => {
  let url = `${apiUrl}/task`;

  let query = "?";
  for (let key in params) {
    query += `${key}=${params[key]}&`;
  }

  if (query !== "?") {
    url += query;
  }

  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await request(url);
      dispatch({ type: actionTypes.GET_TASKS_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const getTask = (taskId) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await request(`${apiUrl}/task/${taskId}`);
      dispatch({ type: actionTypes.GET_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.ADDING_TASK });

      const response = await request(`${apiUrl}/task`, "POST", data);

      dispatch({ type: actionTypes.ADD_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const editTask = (taskId, data, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.EDITING_TASK });
      const response = await request(`${apiUrl}/task/${taskId}`, "PUT", data);
      dispatch({
        type: actionTypes.EDIT_TASK_SUCCESS,
        payload: response,
        from,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTask = (taskId, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REMOVING_TASK });
      await request(`${apiUrl}/task/${taskId}`, "DELETE");

      dispatch({
        type: actionTypes.REMOVE_TASK_SUCCESS,
        payload: taskId,
        from,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTasks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REMOVING_TASKS });
      await request(`${apiUrl}/task/`, "PATCH", data);

      dispatch({
        type: actionTypes.REMOVE_TASKS_SUCCESS,
        payload: data.tasks,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const changeTaskStatus = (taskId, data, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CHANGING_TASK_STATUS });
      const response = await request(`${apiUrl}/task/${taskId}`, "PUT", data);
      dispatch({
        type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
        payload: response,
        from,
        status: data.status,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};
