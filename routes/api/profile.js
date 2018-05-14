import express from 'express';
import passport from 'passport';

import {
  getCurrentProfile,
  getProfileByHandle,
  getProfileById,
  getAllProfiles,
  createUserProfile,
  addExperienceToProfile,
  addEducationToProfile,
  deleteExperienceFromProfile,
  deleteEducationFromProfile,
  deleteUserAndProfile,
} from '../../controllers/profile';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
});

// @route  GET api/profile
// @desc   Get current user profile
// @access PRIVATE
router.get('/', passportJWT, getCurrentProfile);

// @route  GET api/profile/user/:user_id
// @desc   Get all profiles
// @access Public
router.get('/all', getAllProfiles);

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', getProfileByHandle);

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get('/user/:user_id', getProfileById);

// @route  Post api/profile
// @desc   Create or edit user profile
// @access PRIVATE
router.post('/', passportJWT, createUserProfile);

// @route  Post api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/experience', passportJWT, addExperienceToProfile);

// @route  Post api/profile/education
// @desc   Add education to profile
// @access Private
router.post('/education', passportJWT, addEducationToProfile);

// @route  Delete api/profile/experience/:exp_id
// @desc   Delete experience from the profile
// @access Private
router.delete('/experience/:exp_id', passportJWT, deleteExperienceFromProfile);

// @route  Delete api/profile/education/:edu_id
// @desc   Delete education from the profile
// @access Private
router.delete('/education/:edu_id', passportJWT, deleteEducationFromProfile);

// @route  Delete api/profile
// @desc   Delete user and profile
// @access Private
router.delete('/', passportJWT, deleteUserAndProfile);

export default router;
