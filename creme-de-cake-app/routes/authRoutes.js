const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const { getUserProfile, getAllUsers, deleteUser } = require('../controllers/authController'); 
const { updateUser, savePreferredFlavor } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

// 1. User Registration
router.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password, confirmPassword, birthday, address, preferredCakeFlavor } = req.body;

    try {
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            birthday,
            address,
            preferredCakeFlavors: [preferredCakeFlavor],
            profilePhoto: null
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// 2. Update User Profile Route
router.put('/update', authMiddleware, updateUser);

// 3. Save Preferred Flavor Route
router.put('/flavor', authMiddleware, savePreferredFlavor);

// 4. User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

// 5. Google Login
router.post('/google', async (req, res) => {
    const { idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture: profilePhoto } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, phoneNumber: '', profilePhoto });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify Google token' });
    }
});

// 6. Get User Profile (Protected Route)
router.get('/profile', authMiddleware, getUserProfile);

// 7. Get All Users (Admin Route)
router.get('/users', authMiddleware, getAllUsers);

// 8. Delete User
router.delete('/users/delete/:id', authMiddleware, deleteUser);

module.exports = router;

