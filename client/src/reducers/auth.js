import { SET_CURRENT_USER } from "../constants/actions";
import isEmpty from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default auth;
