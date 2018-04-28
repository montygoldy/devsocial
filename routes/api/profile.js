const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//LOAD PROFILE & USER MODELS
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc   Tests profile route
// @access PUBLIC
router.get("/test", (req, res) => res.json({ message: "profile works!" }));

// @route  GET api/profile
// @desc   Get current user profile
// @access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
