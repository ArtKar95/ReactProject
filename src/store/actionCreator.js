import {
  GET_TASKS,
  ADD_TASK,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  REMOVE_TASK,
  HANDLE_SAVE,
  REMOVE_CHECKED_TASKS,
  TAKE_CHECKED_TASKS,
} from "../Redux/types";

export const showLoadingAC = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoadingAC = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const showAlertAC = (text) => {
  return (dispatch) => {
    dispatch({ type: SHOW_ALERT, payload: text });
    setTimeout(() => {
      dispatch(hideAlertAC());
    }, 2000);
  };
};
export const hideAlertAC = () => {
  return {
    type: HIDE_ALERT,
  };
};

export const getTasksAC = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAC());
      const response = await fetch("http://localhost:3001/task", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      dispatch({ type: GET_TASKS, payload: json });
      dispatch(hideLoadingAC());
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const addTaskAC = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/task", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      dispatch({ type: ADD_TASK, payload: json });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const removeTaskAC = (taskId) => {
  return async (dispatch) => {
    try {
      fetch(`http://localhost:3001/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: REMOVE_TASK, payload: taskId });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const handleSaveAC = (taskId, data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/task/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      dispatch({ type: HANDLE_SAVE, payload: json });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const takeCheckedTasksAC = (taskId) => {
  return {
    type: TAKE_CHECKED_TASKS,
    payload: taskId,
  };
};

export const removeCheckedTasksAC = (checkedTasks) => {
  return async (dispatch) => {
    try {
      fetch(`http://localhost:3001/task/`, {
        method: "PATCH",
        body: JSON.stringify({
          tasks: [...checkedTasks],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: REMOVE_CHECKED_TASKS });
    } catch (err) {
      console.log("err", err);
    }
  };
};
