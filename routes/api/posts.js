const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

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

// @route  Delete @api/posts/:id
// @desc   Delete posts
// @access PRIVATE
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postNotFound: "No post found" }));
    });
  }
);

module.exports = router;
