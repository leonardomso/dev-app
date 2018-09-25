import { combineReducers } from "redux";

import auth from "./auth";
import errors from "./errors";

const rootReducer = combineReducers({
  auth,
  errors
});

export default rootReducer;
