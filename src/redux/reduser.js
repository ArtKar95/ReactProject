import * as actionTypes from "./actionTypes";

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
};

const toDoReduser = (state = initState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case actionTypes.LOADING:
      return loadingState;

    case actionTypes.FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.SHOW_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }

    case actionTypes.HIDE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }

    case actionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    }

    case actionTypes.GET_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    }

    case actionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        addTaskSuccess: true,
        successMessage: "Task created successfully",
      };
    }

    case actionTypes.ADDING_TASK: {
      return { ...loadingState, addTaskSuccess: false };
    }

    case actionTypes.EDITING_TASK: {
      return { ...loadingState, editTaskSuccess: false };
    }

    case actionTypes.EDIT_TASK_SUCCESS: {
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

    case actionTypes.CHANGING_TASK_STATUS: {
      return loadingState;
    }

    case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
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

    case actionTypes.REMOVING_TASK: {
      return {
        ...loadingState,
        removeTaskSuccess: false,
      };
    }

    case actionTypes.REMOVE_TASK_SUCCESS: {
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

    case actionTypes.REMOVING_TASKS:
      return { ...loadingState, removeTasksSuccess: false };

    case actionTypes.REMOVE_TASKS_SUCCESS: {
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
