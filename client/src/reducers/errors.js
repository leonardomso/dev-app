import { GET_ERRORS } from "../constants/actions";

const initialState = {};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default auth;
