import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./Reducer/index";
import thunk from "redux-thunk";

const middleware = [thunk];
const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
