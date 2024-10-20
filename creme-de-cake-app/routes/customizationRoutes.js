const express = require('express');
const router = express.Router();
const Customization = require('../models/Customization');

// POST request to create a new customization
router.post('/', async (req, res) => {
  const { flavor, name } = req.body;

  try {
    // Create a new customization object without the user
    const newCustomization = new Customization({
      flavor,
      customFlavor: '',
      name,
      user: null,  // No user yet, will be filled in Checkout.js
    });

    // Save the new customization to the database
    const savedCustomization = await newCustomization.save();

    // Return the saved customization's ID to the frontend
    res.status(201).json(savedCustomization);
  } catch (error) {
    console.error('Error creating customization:', error);
    res.status(500).json({ error: 'Failed to create customization' });
  }
});

module.exports = router;

