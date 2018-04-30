const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/Post");

//Post validation
const validatePostInput = require("../../validations/post");

// @route  GET @api/posts/test
// @desc   Tests posts route
// @access PUBLIC
router.get("/test", (req, res) => res.json({ message: "posts works!" }));

// @route  GET @api/posts
// @desc   Read post
// @access Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ noPostsFound: "No posts found" }));
});

// @route  GET @api/posts/:id
// @desc   Get post by id
// @access Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that id" })
    );
});

// @route  Post @api/posts
// @desc   Create post
// @access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
