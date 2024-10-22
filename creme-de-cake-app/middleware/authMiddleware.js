const jwt = require('jsonwebtoken');

// Middleware for authenticating JWT tokens
const authMiddleware = (req, res, next) => {
    const publicRoutes = ['/api/orders', '/api/register', '/api/login', '/api/google']; // Add more public routes if necessary
    console.log(`Request path: ${req.path}`); // Log the request path

    // Skip authentication for public routes
    if (publicRoutes.includes(req.path)) {
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
        console.error('Invalid token:', error.message); // Log the error for debugging
        return res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

