const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as necessary
const multer = require('multer');

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data." });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user data." });
  }
});

// Upload profile picture
router.post('/:id/upload', upload.single('profilePicture'), (req, res) => {
  // Save file path to the user and send response
  const filePath = req.file.path; // Adjust based on your storage structure
  // Logic to update user profile with the filePath
});

module.exports = router;


