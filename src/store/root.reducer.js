import { combineReducers } from "redux";

import locationReducer from "../containers/Location/Location.reducer";
import appReducer from "../App/App.reducer";

const rootReducer = combineReducers({
  location: locationReducer,
  app: appReducer
});

export default rootReducer;
