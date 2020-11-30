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
} from "./types";

const initState = {
  tasks: [],
  loading: false,
  alert: null,
  checkedTasks: new Set(),
};

const toDoReduser = (state = initState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }

    case SHOW_LOADER: {
      return {
        ...state,
        loading: true,
      };
    }

    case HIDE_LOADER: {
      return {
        ...state,
        loading: false,
      };
    }

    case SHOW_ALERT: {
      return {
        ...state,
        alert: action.payload,
      };
    }

    case HIDE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }

    case ADD_TASK: {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    }

    case REMOVE_TASK: {
      const newTask = state.tasks.filter((item) => item._id !== action.payload);
      return {
        ...state,
        tasks: [...newTask],
      };
    }

    case HANDLE_SAVE: {
      const { tasks } = state;
      const taskIndex = tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      tasks[taskIndex] = action.payload;
      return {
        ...state,
        tasks: [...state.tasks],
      };
    }

    case TAKE_CHECKED_TASKS: {
      const checkedTasks = new Set(state.checkedTasks);
      checkedTasks.has(action.payload)
        ? checkedTasks.delete(action.payload)
        : checkedTasks.add(action.payload);
      return {
        ...state,
        checkedTasks,
      };
    }

    case REMOVE_CHECKED_TASKS: {
      const { tasks } = state;

      state.checkedTasks.forEach((taskId) =>
        tasks.filter((task) => task._id !== taskId)
      );
      state.checkedTasks.clear();
      return {
        ...state,
        tasks: tasks, //ay es toxy vonc anem vor aranc tarmacnel tasky jnjvi jnjvuma 
        // bayc chi korom ejic tarmacneluc heto jnjvaca limu, bazayum jnjvuma
        checkedTasks: state.checkedTasks,
      };
    }

    default:
      return state;
  }
};

export default toDoReduser;
