import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  ADD_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
}