const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @name registerUserController
 * @desc Register a new user
 * @access Public
 * @route POST /api/auth/register
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const isUsernameExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUsernameExists) {
    return res
      .status(400)
      .json({ message: 'Username or email already exists' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  res.cookie('token', token);

  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
};
