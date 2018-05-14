import Post from '../models/Post';
import Profile from '../models/Profile';
// Load validation
import validatePostInput from '../validations/post';

export const getAllPosts = async (req, res) => {
  const errors = {};
  try {
    const posts = await Post.find().sort({
      date: -1,
    });
    return res.json(posts);
  } catch (error) {
    errors.nopost = 'No post found';
    return res.status(404).json(errors);
  }
};

export const getPostById = async (req, res) => {
  const errors = {};
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      errors.nopost = `No post found for ${req.params.id}`;
      return res.status(404).json(errors);
    }
    return res.json(post);
  } catch (error) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};

export const createPost = async (req, res) => {
  try {
    // Validate input
    const {
      errors,
      isValid,
    } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const postFields = {};
    postFields.user = req.user.id;
    postFields.avatar = req.body.avatar;
    postFields.name = req.body.name;
    postFields.text = req.body.text;

    // Create new profile
    const newPost = await new Post(postFields).save();
    return res.json(newPost);
  } catch (err) {
    throw err;
  }
};

export const likePost = async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.noprofile = 'No profile found';
      return res.status(404).json(errors);
    }

    let post = await Post.findById(req.params.id);
    if (!post) {
      errors.nopost = `No post found for ${req.params.id}`;
      return res.status(404).json(errors);
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      errors.alreadyLiked = 'User already liked this post';
      return res.status(400).json(errors);
    }

    // Add user id to likes array
    post.likes = [{
      user: req.user.id,
    }].concat(post.likes);

    // Save the post
    post = await post.save();

    return res.json(post);
  } catch (err) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};

export const unlikePost = async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.noprofile = 'No profile found';
      return res.status(404).json(errors);
    }

    let post = await Post.findById(req.params.id);
    if (!post) {
      errors.nopost = `No post found for ${req.params.id}`;
      return res.status(404).json(errors);
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      errors.notLiked = 'You have not yest liked this post';
      return res.status(400).json(errors);
    }

    // Remove user id from likes array
    const updatedLikes = post.likes.filter(like => like.user.toString() !== req.user.id);
    post.likes = updatedLikes;

    // Save the post
    post = await post.save();

    return res.json(post);
  } catch (err) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};

export const addComment = async (req, res) => {
  const {
    errors,
    isValid,
  } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      errors.nopost = `No post found for ${req.params.id}`;
      return res.status(404).json(errors);
    }

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    };

    // Add comment to comments array
    post.comments.unshift(newComment);

    // Save the post
    post = await post.save();

    return res.json(post);
  } catch (err) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};

export const deletePost = async (req, res) => {
  let errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.noprofile = 'No profile found';
      return res.status(404).json(errors);
    }

    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) {
      errors.nopost = `No post found for ${req.params.id}`;
      return res.status(404).json(errors);
    }

    // Check for post owner
    if (post.user.toString() !== req.user.id) {
      errors = {
        notauthorized: 'User no authorized',
      };
      return res.status(401).json(errors);
    }

    // Delete the post
    await post.remove();

    return res.json({
      success: true,
    });
  } catch (err) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};

export const deleteComment = async (req, res) => {
  const errors = {};
  try {
    const post = await Post.findById(req.params.id);

    // Check to see if comment exists
    if (
      post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0
    ) {
      errors.commentnotexists = 'Comment does not exist';
      return res.status(404).json(errors);
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id.toString())
      .indexOf(req.params.comment_id);

    // Make sure only the comment owner can delete comment
    if (req.user.id !== post.comments[removeIndex].user.toString()) {
      return res.status(401).json({
        notauthorized: 'User not authorized',
      });
    }

    // Splice comment out of array
    post.comments.splice(removeIndex, 1);

    await post.save();
    return res.json(post);
  } catch (err) {
    errors.nopost = `No post found for ${req.params.id}`;
    return res.status(404).json(errors);
  }
};
