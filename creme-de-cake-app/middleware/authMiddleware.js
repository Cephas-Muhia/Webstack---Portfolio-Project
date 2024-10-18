const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const publicRoutes = ['/api/orders']; // Add more public routes as needed
       console.log(`Request path: ${req.path}`); // Log the request path

    // Skip authentication for defined public routes
    if (publicRoutes.includes(req.path)) {
        return next(); // Allow access without token
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach verified user to request
        console.log('Verified user:', req.user); // Log the verified user
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

