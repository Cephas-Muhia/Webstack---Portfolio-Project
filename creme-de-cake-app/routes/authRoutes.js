const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Public route for registration
router.post('/register', registerUser);

// Public route for login
router.post('/login', loginUser);


module.exports = router;

