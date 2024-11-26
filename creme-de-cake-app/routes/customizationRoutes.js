const express = require('express');
const multer = require('multer');
const Customization = require('../models/Customization');
const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
});

// Create a new customization
router.post('/', upload.single('designImage'), async (req, res) => {
  try {
    console.log('Received Payload:', req.body);
    console.log('Received File:', req.file);

    // Destructure fields from the request body
    const { 
      flavors, 
      customFlavor, 
      sizeInKgs, 
      decorations, 
      icingType, 
      shape, 
      message, 
      additionalDescription, 
      preferredColors 
    } = req.body;

    // Validate required fields
    if (!flavors || !sizeInKgs || !shape) {
      return res.status(400).json({ error: 'Flavors, sizeInKgs, and shape are required.' });
    }

    // Process preferredColors into an array (handle empty or invalid input gracefully)
    const colorsArray = preferredColors 
      ? preferredColors.split(',').map((color) => color.trim()).filter((color) => color !== '') 
      : [];

    // Create a new customization instance
    const newCustomization = new Customization({
      flavors,
      customFlavor: customFlavor || null,
      sizeInKgs: parseFloat(sizeInKgs), // Convert size to a float
      decorations: decorations || null,
      icingType: icingType || null,
      shape,
      message: message || '',
      additionalDescription: additionalDescription || '',
      preferredColors: colorsArray, // Save colors as an array
      designImage: req.file ? req.file.path : null, // Save uploaded image path or null
    });

    // Save to the database
    const savedCustomization = await newCustomization.save();

    // Respond with the saved customization
    res.status(201).json(savedCustomization);
  } catch (error) {
    console.error('Error saving customization:', error);
    res.status(500).json({ error: 'Failed to save customization.' });
  }
});



// Get all customizations
router.get('/', async (req, res) => {
  try {
    const customizations = await Customization.find();
    res.json(customizations);
  } catch (error) {
    console.error('Error fetching customizations:', error);
    res.status(500).json({ error: 'Failed to fetch customizations.' });
  }
});

module.exports = router;

