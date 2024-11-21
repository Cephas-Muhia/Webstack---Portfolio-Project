const express = require('express');
const multer = require('multer');
const Customization = require('../models/Customization');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/designs/'); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new customization
router.post('/', upload.single('designImage'), async (req, res) => {
  try {
    const {
      flavors,
      customFlavor,
      sizeInKgs,
      decorations,
      icingType,
      shape,
      message,
      additionalDescription,
      preferredColors,
    } = req.body;

    const customization = new Customization({
      flavors: JSON.parse(flavors || '[]'),
      customFlavor,
      sizeInKgs: parseFloat(sizeInKgs),
      decorations: JSON.parse(decorations || '[]'),
      icingType,
      shape,
      message,
      additionalDescription,
      preferredColors: JSON.parse(preferredColors || '[]'),
      designImage: req.file ? req.file.path : null, // Save file path if uploaded
    });

    await customization.save();
    res.status(201).json({ message: 'Customization saved!', _id: customization._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving customization.' });
  }
});

// Get customization by ID
router.get('/:id', async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id);
    if (!customization) {
      return res.status(404).json({ error: 'Customization not found.' });
    }
    res.status(200).json(customization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching customization.' });
  }
});

module.exports = router;

