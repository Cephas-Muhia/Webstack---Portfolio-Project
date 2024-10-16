const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const newUser = new User({ name, email, phoneNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  // Implement login logic here (password checking, token generation, etc.)
};

