import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthToken from "../constants/authToken";
import { GET_ERRORS, SET_CURRENT_USER } from "../constants/actions";

// Register an user.
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/signin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login and get an user token.
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      // Save to Local Storage.
      const { token } = res.data;
      // Set token to Local Storage.
      localStorage.setItem("jwtToken", token);
      // Set token to auth header.
      setAuthToken(token);
      // Decode token to get user data.
      const userDecoded = jwtDecode(token);
      // Set current user.
      dispatch(setCurrentUser(userDecoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user.
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out.
export const logoutUser = () => dispatch => {
  // Remove token from Local Storage.
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests.
  setAuthToken(false);
  // Set the current user to an empty object.
  // Which will also set isAuthenticate to 'false'.
  dispatch(setCurrentUser({}));
};
