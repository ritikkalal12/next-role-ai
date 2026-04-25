const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

// Middleware to authenticate the user using JWT token
async function authUser(req, res, next) {
  const token = req.cookies.token; // Get the token from the request cookies

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token }); // Check if the token is blacklisted (for logout functionality)

  // If the token is blacklisted, return an unauthorized response
  if (isTokenBlacklisted) {
    return res.status(401).json({ message: 'Token is Invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' }); // If token verification fails, return an unauthorized response
  }
}

module.exports = {
  authUser,
};
