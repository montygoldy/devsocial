import express from 'express';
import passport from 'passport';
import {
  registerUser,
  loginUser,
  currentUser,
} from '../../controllers/user';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
});


// @route  Register @api/users/register
// @desc   Register user route
// @access PUBLIC
router.post('/register', registerUser);

// @route  GET @api/users/Login
// @desc   Login user route
// @access PUBLIC
router.post('/login', loginUser);

// @route  GET @api/users/current
// @desc   Return Current user route
// @access PRIVATE
router.get(
  '/current',
  passportJWT, currentUser,
);

export default router;
