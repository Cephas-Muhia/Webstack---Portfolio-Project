const jwt = require('jsonwebtoken');

// Middleware for authenticating JWT tokens
const authMiddleware = (req, res, next) => {
  const publicRoutes = ['/api/register', '/api/login', '/api/google'];

  console.log(`Request path: ${req.path}`); // Log the request path

  // Skip authentication for public routes (case-insensitive match and can handle dynamic routes)
  if (publicRoutes.some(route => req.path.toLowerCase().startsWith(route.toLowerCase()))) {
    return next(); // Allow access without token
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token and extract user data
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach verified user to the request object
    console.log('Verified user:', req.user); // Log the verified user for debugging
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token expiration specifically
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token expired. Please log in again.' });
    }

    console.error('Invalid token:', error.message); // Log the error for debugging
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;

