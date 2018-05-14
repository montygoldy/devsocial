import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import keys from '../config/keys';
// Validation middlewares
import validateRegisterInput from '../validations/register';
import validateLoginInput from '../validations/login';

export const registerUser = async (req, res) => {
  const {
    errors,
    isValid,
  } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    name,
    email,
    password,
  } = req.body;
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm', // Default
  });

  const user = new User({
    name,
    email,
    avatar,
    password,
  });

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // override the cleartext password with the hashed one
    user.password = hash;

    // save the new user
    const newUser = await user.save();

    return res.json(newUser);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (req, res) => {
  const {
    errors,
    isValid,
  } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    email,
    password,
  } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({
      email,
    });

    // Check for user
    if (!user) {
      errors.email = 'Email not found';
      return res.status(404).json(errors);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.email = 'Invalid password';
      return res.status(404).json(errors);
    }

    // IF User matched, create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    // Sign token
    const token = await jwt.sign(payload, keys.secretKey, {
      expiresIn: 3600000,
    });

    return res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    errors.password = 'Password incorrect ';
    return res.status(400).json(errors);
  }
};

export const currentUser = async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};
