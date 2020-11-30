import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thankMiddleWare from "redux-thunk";
import toDoReduser from "./ToDo-reduser";

const store = createStore(
  toDoReduser,
  compose(
    applyMiddleware(logger, thankMiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
