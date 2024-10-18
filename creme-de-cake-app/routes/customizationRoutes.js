const express = require('express');
const Customization = require('../models/Customization'); 
const router = express.Router();


// POST route for customization
router.post('/customization', async (req, res) => {
  try {
    const { cakeId, flavor, name, sizeInKgs, decorations, icingType, shape, celebrationExtras, message, additionalDescription, preferredColors, designImage } = req.body;

    // Validate required fields
    if (!cakeId || !flavor || !name) {
      return res.status(400).json({ message: 'Cake ID, flavor, and name are required.' });
    }

    // Create a new customization object
    const newCustomization = new Customization({
      cakeId,
      CakeFlavor,
      name,
      sizeInKgs,
      decorations,
      icingType,
      shape,
      celebrationExtras,
      message,
      additionalDescription,
      preferredColors,
      designImage
    });

    // Save the customization to the database
    await newCustomization.save();

    res.status(201).json({ message: 'Customization saved successfully', customization: newCustomization });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while saving customization', error: error.message });
  }
});

// Fetch all customizations
router.get('/', async (req, res) => {
    try {
        const customizations = await Customization.find(); // Fetch all customizations from the database
        res.json(customizations);
    } catch (error) {
        console.error('Error fetching customizations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new customization ( allow adding new customizations)
router.post('/', async (req, res) => {
    const newCustomization = new Customization(req.body);
    try {
        const savedCustomization = await newCustomization.save(); // Save the new customization to the database
        res.status(201).json(savedCustomization);
    } catch (error) {
        console.error('Error saving customization:', error);
        res.status(400).json({ message: 'Error saving customization' });
    }
});



module.exports = router;
