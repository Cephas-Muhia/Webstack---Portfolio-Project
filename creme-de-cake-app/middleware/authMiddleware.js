const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the verified user to the request
    next(); // Call the next middleware
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware; 

