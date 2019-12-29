import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save_state_locally, get_local_state } from "../middleware/local.saver";
import rootReducers from "./root.reducer";

const middleware = [thunk, save_state_locally];

const preloadedState = get_local_state();

const store = createStore(
  rootReducers,
  preloadedState,
  applyMiddleware(...middleware)
);

export default store;
