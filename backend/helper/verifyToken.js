const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  // If token is not provided
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // Attach the decoded token to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
}

module.exports = authenticateToken;