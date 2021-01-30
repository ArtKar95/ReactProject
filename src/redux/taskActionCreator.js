import { request } from "../Helpers/request";
import * as taskActionTypes from "./taskActionTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export const showLoading = () => {
  return {
    type: taskActionTypes.LOADING,
  };
};

export const showAlert = (text) => {
  return (dispatch) => {
    dispatch({ type: taskActionTypes.SHOW_ALERT, payload: text });
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };
};

export const hideAlert = () => {
  return {
    type: taskActionTypes.HIDE_ALERT,
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
      dispatch({ type: taskActionTypes.GET_TASKS_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const getTask = (taskId) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const response = await request(`${apiUrl}/task/${taskId}`);

      dispatch({ type: taskActionTypes.GET_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: taskActionTypes.ADDING_TASK });

      const response = await request(`${apiUrl}/task`, "POST", data);

      dispatch({ type: taskActionTypes.ADD_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const editTask = (taskId, data, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: taskActionTypes.EDITING_TASK });

      const response = await request(`${apiUrl}/task/${taskId}`, "PUT", data);

      dispatch({
        type: taskActionTypes.EDIT_TASK_SUCCESS,
        payload: response,
        from,
      });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTask = (taskId, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: taskActionTypes.REMOVING_TASK });

      await request(`${apiUrl}/task/${taskId}`, "DELETE");

      dispatch({
        type: taskActionTypes.REMOVE_TASK_SUCCESS,
        payload: taskId,
        from,
      });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTasks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: taskActionTypes.REMOVING_TASKS });

      await request(`${apiUrl}/task/`, "PATCH", data);

      dispatch({
        type: taskActionTypes.REMOVE_TASKS_SUCCESS,
        payload: data.tasks,
      });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};

export const changeTaskStatus = (taskId, data, from = "tasks") => {
  return async (dispatch) => {
    try {
      dispatch({ type: taskActionTypes.CHANGING_TASK_STATUS });

      const response = await request(`${apiUrl}/task/${taskId}`, "PUT", data);

      dispatch({
        type: taskActionTypes.CHANGE_TASK_STATUS_SUCCESS,
        payload: response,
        from,
        status: data.status,
      });
    } catch (err) {
      dispatch({ type: taskActionTypes.FAILURE, payload: err.message });
    }
  };
};
