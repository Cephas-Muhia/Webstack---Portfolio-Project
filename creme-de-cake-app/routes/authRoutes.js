const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { updateUser, savePreferredFlavor } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv').config();
const auth = require('../middleware/authMiddleware');


const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET; // Use the secret from environment variables

// 1. User Registration
router.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password, confirmPassword, birthday, address, preferredCakeFlavor, profilePhotos } = req.body;

    try {
        // Validate input
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            birthday,
            address,
            preferredCakeFlavors,
            profilePhoto: null 
        });

        // Save user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// 2. Update user profile

console.log('updateUser function:', updateUser);
console.log('savePreferredFlavor function:', savePreferredFlavor);

router.put('/update', verifyToken, updateUser);

// 3. User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

// Google Login
router.post('/google', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Use the actual environment variable
        });

        const { name, email, picture: profilePhoto } = ticket.getPayload(); // Extract user info

        let user = await User.findOne({ email });
        if (!user) {
            // If user does not exist, create a new user
            user = new User({ name, email, phoneNumber: '', profilePhoto }); // Save profile photo URL
            await user.save();
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to verify Google token' });
    }
});


// 5. Get User Profile (Protected Route)
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Use verified token's user ID
        const user = await User.findById(userId).select('-password'); // Exclude password
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
});

// 6. Get All Users (Admin Route)
router.get('/users', authMiddleware, async (req, res) => { // Only admins can access this route
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Return users as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// 7. Delete User
router.delete('/users/delete/:id', authMiddleware, async (req, res) => { // Only admins can access this route
    const { id } = req.params; // Extract user ID from request parameters

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = router;

