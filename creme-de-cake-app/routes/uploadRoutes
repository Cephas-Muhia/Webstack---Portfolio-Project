const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  }
});

const upload = multer({ storage: storage });

// Route for uploading the design image
router.post('/uploads', upload.single('designImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  // Return the path to the uploaded file
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;

