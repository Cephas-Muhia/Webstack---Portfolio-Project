const express = require('express');
const router = express.Router();
const Customization = require('../models/Customization');

// POST request to create a new customization (for both Catalogue and Customize page)
router.post('/', async (req, res) => {
    const {
        flavor,             // Required field from both pages
        name,               // Required field from both pages
        customFlavor = '',   // Optional, defaults to empty string
        sizeInKgs = null,    // Optional, defaults to null
        decorations = null,  // Optional, defaults to null
        icingType = null,    // Optional, defaults to null
        shape = null,        // Optional, defaults to null
        CelebrationExtras = null, // Optional, defaults to null
        message = '',        // Optional, defaults to empty string
        AdditionalDescription = '',  // Optional, defaults to empty string
        preferredColors = null,      // Optional, defaults to null
        designImage = null,          // Optional, defaults to null
        user = null                 // User will be assigned later at checkout if necessary
    } = req.body;

    try {
        // Set user to null if not provided (not registered)
        const userId = user ? user : null;

        // Create a new customization object based on the provided data
        const newCustomization = new Customization({
            flavor,
            name,
            customFlavor,
            sizeInKgs,
            decorations,
            icingType,
            shape,
            CelebrationExtras,
            message,
            AdditionalDescription,
            preferredColors,
            designImage,
            user: userId  // Use the userId (null if not registered)
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


