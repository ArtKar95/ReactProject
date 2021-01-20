import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import toDoReduser from "./toDoReduser";
import authReduser from "./authReduser";

const middlewaresArr = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewaresArr.push(logger);
}

const middleWares = applyMiddleware(...middlewaresArr);

const mainReduser = combineReducers({
  toDoReduser,
  authReduser,
});

const store = createStore(mainReduser, composeWithDevTools(middleWares));

export default store;
