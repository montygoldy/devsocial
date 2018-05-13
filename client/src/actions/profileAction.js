import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

//Get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  }
}

//Create Profile
export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post("/api/profile", profileData);
    history.push("/dashboard")
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//Clear profile 
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

//Add Experience
export const addExperience = (expData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/experience", expData);
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//DeleteExperience
export const deleteExperience = (id) => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//Add Education
export const addEducation = (eduData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/education", eduData);
    history.push("/dashboard")
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//DeleteEducation
export const deleteEducation = (id) => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

//Get all Profiles
export const getProfiles = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get('/api/profile/all');
    dispatch({
      type: GET_PROFILES,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILES,
      payload: null
    })
  }
}

//Get all Profile by handle
export const getProfileByHandle = (handle) => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: null
    })
  }
}

//Delete Account and Profile
export const deleteAccount = () => async dispatch => {
  try {
    if (window.confirm("Are you sure? This cannot be undone")) {
      await axios.delete("/api/profile");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}