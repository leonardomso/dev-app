import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  GET_ERRORS
} from "../constants/actions";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default post;
