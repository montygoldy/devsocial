import express from 'express';
import passport from 'passport';

import {
  getPostById,
  getAllPosts,
  createPost,
  likePost,
  unlikePost,
  addComment,
  deletePost,
  deleteComment,
} from '../../controllers/posts';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
});

// @route  GET @api/posts
// @desc   Read post
// @access Public

router.get('/', getAllPosts);

// @route  GET @api/posts/:id
// @desc   Get post by id
// @access Public

router.get('/:id', getPostById);

// @route  Post @api/posts
// @desc   Create post
// @access PRIVATE
router.post('/', passportJWT, createPost);

// @route  Delete @api/posts/:id
// @desc   Delete posts
// @access PRIVATE
router.delete('/:id', passportJWT, deletePost);

// @route  Post @api/posts/like/:id
// @desc   Like posts
// @access PRIVATE
router.post('/like/:id', passportJWT, likePost);

// @route  Post @api/posts/unlike/:id
// @desc   UnLike posts
// @access PRIVATE
router.post('/unlike/:id', passportJWT, unlikePost);

// @route  Post @api/posts/comment/:id
// @desc   Add comment to posts
// @access PRIVATE
router.post('/comment/:id', passportJWT, addComment);

// @route  Delete @api/posts/comment/:id/:comment_id
// @desc   Delete comment to posts
// @access PRIVATE
router.delete('/comment/:id/:comment_id', passportJWT, deleteComment);

export default router;
