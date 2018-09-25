import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../constants/actions";

// Get current profile.
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Set profile loading.
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Set profile loading.
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
