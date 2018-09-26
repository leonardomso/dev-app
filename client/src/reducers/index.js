import { combineReducers } from "redux";

import auth from "./auth";
import profile from "./profile";
import errors from "./errors";
import post from "./post";

const rootReducer = combineReducers({
  auth,
  profile,
  errors,
  post
});

export default rootReducer;
