const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up a new user (registration)
exports.signUpUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword, // Save the hashed password
        });

        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Sign In user (authentication)
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Sign in successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

