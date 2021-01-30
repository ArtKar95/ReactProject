import * as taskActionTypes from "./taskActionTypes";
import { LOGOUT_SUCCESS, AUTH_LOADING } from "./authActionTypes";

const initState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  alert: null,
  successMessage: null,
  addTaskSuccess: false,
  removeTasksSuccess: false,
  removeTaskSuccess: false,
  editTaskSuccess: false,
  filterSuccess: false,
};

const toDoReduser = (state = initState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
    filterSuccess: false,
  };

  switch (action.type) {
    case LOGOUT_SUCCESS:
      return initState;

    case AUTH_LOADING: {
      return {
        ...state,
        successMessage: null,
        error: null,
      };
    }

    case taskActionTypes.LOADING:
      return loadingState;

    case taskActionTypes.FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case taskActionTypes.SHOW_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }

    case taskActionTypes.HIDE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }

    case taskActionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        filterSuccess: true,
      };
    }

    case taskActionTypes.GET_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    }

    case taskActionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        addTaskSuccess: true,
        successMessage: "Task created successfully",
      };
    }

    case taskActionTypes.ADDING_TASK: {
      return { ...loadingState, addTaskSuccess: false };
    }

    case taskActionTypes.EDITING_TASK: {
      return { ...loadingState, editTaskSuccess: false };
    }

    case taskActionTypes.EDIT_TASK_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        editTaskSuccess: true,
        successMessage: "Task edited successfully",
      };

      if (action.from === "task") {
        return {
          ...newState,
          task: action.payload,
        };
      } else {
        const tasks = state.tasks;
        const taskIndex = tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        tasks[taskIndex] = action.payload;
        return {
          ...newState,
          tasks,
        };
      }
    }

    case taskActionTypes.CHANGING_TASK_STATUS: {
      return loadingState;
    }

    case taskActionTypes.CHANGE_TASK_STATUS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        successMessage:
          action.status === "done"
            ? "The task is completed 🎉"
            : "The task is active now",
      };

      if (action.from === "task") {
        return {
          ...newState,
          task: action.payload,
        };
      } else {
        const tasks = state.tasks;
        const taskIndex = tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        tasks[taskIndex] = action.payload;
        return {
          ...newState,
          tasks,
        };
      }
    }

    case taskActionTypes.REMOVING_TASK: {
      return {
        ...loadingState,
        removeTaskSuccess: false,
      };
    }

    case taskActionTypes.REMOVE_TASK_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        successMessage: "Task removed successfully",
      };
      if (action.from === "task") {
        return {
          ...newState,
          task: null,
          removeTaskSuccess: true,
        };
      } else {
        const newTask = state.tasks.filter(
          (item) => item._id !== action.payload
        );

        return {
          ...newState,
          tasks: newTask,
        };
      }
    }

    case taskActionTypes.REMOVING_TASKS:
      return { ...loadingState, removeTasksSuccess: false };

    case taskActionTypes.REMOVE_TASKS_SUCCESS: {
      let newTasks = [...state.tasks];

      action.payload.forEach((taskId) => {
        newTasks = newTasks.filter((task) => task._id !== taskId);
      });

      return {
        ...state,
        loading: false,
        tasks: newTasks,
        successMessage: "Tasks removed successfully",
        removeTasksSuccess: true,
      };
    }

    default:
      return state;
  }
};

export default toDoReduser;
