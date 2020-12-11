import request from "../Helpers/request";
import * as actionTypes from "./actionTypes";

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

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await request("http://localhost:3001/task");
      dispatch({ type: actionTypes.GET_TASKS_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.ADDING_TASK });

      const response = await request(
        "http://localhost:3001/task",
        "POST",
        data
      );

      dispatch({ type: actionTypes.ADD_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const editTask = (taskId, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.EDITING_TASK });
      const response = await request(
        `http://localhost:3001/task/${taskId}`,
        "PUT",
        data
      );
      dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTask = (taskId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REMOVING_TASK });
      await request(`http://localhost:3001/task/${taskId}`, "DELETE");

      dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, payload: taskId });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const removeTasks = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REMOVING_TASKS });
      await request(`http://localhost:3001/task/`, "PATCH", data);

      dispatch({
        type: actionTypes.REMOVE_TASKS_SUCCESS,
        payload: data.tasks,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};
