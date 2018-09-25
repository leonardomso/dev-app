import { combineReducers } from "redux";

import auth from "./auth";
import profile from "./profile";
import errors from "./errors";

const rootReducer = combineReducers({
  auth,
  profile,
  errors
});

export default rootReducer;
