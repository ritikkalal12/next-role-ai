const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

/**
 * @name registerUserController
 * @desc Register a new user
 * @access Public
 * @route POST /api/auth/register
 */

async function registerUserController(req, res) {
  // Implement registration logic here
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if username or email already exists
  const isUsernameExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // If username or email already exists, return an error response
  if (isUsernameExists) {
    return res
      .status(400)
      .json({ message: 'Username or email already exists' });
  }

  // Hash the password before saving to the database
  const hash = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  // Generate a JWT token for the registered user
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  // Set the token in a cookie (optional)
  res.cookie('token', token);

  // Return a success response with the registered user's information (excluding the password)
  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUserController(req, res) {
  // Implement login logic here
  const { email, password } = req.body;

  // Validate input
  const user = await userModel.findOne({ email });

  // If user not found, return an error response
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If password is invalid, return an error response
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the logged-in user
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  // Set the token in a cookie (optional)
  res.cookie('token', token);

  // Return a success response with the logged-in user's information (excluding the password)
  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

async function logoutUserController(req, res) {
  // Implement logout logic here (blacklist the token)
  const token = req.cookies.token;

  // If token exists, add it to the blacklist
  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  // Clear the token cookie
  res.clearCookie('token');

  // Return a success response
  return res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
