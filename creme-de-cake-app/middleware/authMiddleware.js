const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const publicRoutes = ['/api/register', '/api/login', '/api/google'];

  if (publicRoutes.some(route => req.path.toLowerCase().startsWith(route.toLowerCase()))) {
    return next(); // Allow access without token
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token expired. Please log in again.' });
    }
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;

