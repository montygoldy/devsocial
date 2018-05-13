import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register USer
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", userData);
    history.push("/login")
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
};

//Login - Get User token
export const loginUser = userData => async dispatch => {
  try {
    const response = await axios.post("/api/users/login", userData);
    //Save to localstorage
    const {
      token
    } = response.data;
    localStorage.setItem("jwtToken", token);
    //Set token to auth header
    setAuthToken(token);
    //Decode token to get userData
    const decoded = jwt_decode(token);
    //Set Current USer
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
};

//Set logged in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out

export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove Auth Header for future request
  setAuthToken(false);
  //Set current user to {} n also isAuthenticated to false
  dispatch(setCurrentUser({}));
};