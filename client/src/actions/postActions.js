import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

//ADD POST
export const addPost = postData => async dispatch => {
  dispatch(clearErrors());
  try {
    const response = await axios.post('/api/posts', postData);
    dispatch({
      type: ADD_POST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
};


//GET posts
export const getPosts = () => async dispatch => {
  dispatch(clearErrors());
  try {
    dispatch(setPostLoading());
    const response = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  }
}

//Delete posts
export const deletePost = (id) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//Add Like
export const addLike = (id) => async dispatch => {
  try {
    await axios.post(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//Remove Like
export const removeLike = (id) => async dispatch => {
  try {
    await axios.post(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//GET post
export const getPost = (id) => async dispatch => {
  try {
    dispatch(setPostLoading());
    const response = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_POST,
      payload: null
    })
  }
}

//ADD Comment
export const addComment = (commentData, postId) => async dispatch => {
  try {
    dispatch(clearErrors());
    const response = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  };
}

//Delete Comments
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const response = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}


// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}