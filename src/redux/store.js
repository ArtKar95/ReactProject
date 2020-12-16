import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import toDoReduser from "./reduser";

const middleWares = applyMiddleware(thunk, logger);

const store = createStore(
  toDoReduser,
  compose(
    middleWares,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
