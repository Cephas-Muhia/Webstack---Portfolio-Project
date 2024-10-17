const express = require('express');
const Customization = require('../models/Customization'); 
const router = express.Router();

// Route for submitting customizations

router.post('/customizations', async (req, res) => {
  try {
    const customizationData = new Customization(req.body); // Create a new customization document
    await customizationData.save(); // Save to the database
    res.status(201).json({ message: 'Customization saved successfully!', data: customizationData });
  } catch (error) {
    console.error('Error saving customization:', error);
    res.status(500).json({ message: 'Error saving customization.', error: error.message });
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
