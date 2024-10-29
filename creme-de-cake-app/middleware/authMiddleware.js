const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const publicRoutes = ['/api/register', '/api/login', '/api/google'];

    if (publicRoutes.some(route => req.path.toLowerCase().startsWith(route.toLowerCase()))) {
        return next(); // Allow access to public routes without token
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please log in again.' });
        }
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

