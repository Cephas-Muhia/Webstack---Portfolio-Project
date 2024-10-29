const express = require('express');
const mongoose = require('mongoose'); // Import mongoose to use ObjectId
const router = express.Router();
const Customization = require('../models/Customization');

// POST request to create a new customization (for both Catalogue and Customize page)
router.post('/', async (req, res) => {
    const {
        flavor,
        name,
        customFlavor = '',
        sizeInKgs = null,
        decorations = null,
        icingType = null,
        shape = null,
        CelebrationExtras = null,
        message = '',
        AdditionalDescription = '',
        preferredColors = null,
        designImage = null,
        user = null
    } = req.body;

    try {
        // Check if user is provided and is a valid ObjectId, else set it to null
        const userId = user && mongoose.Types.ObjectId.isValid(user) ? mongoose.Types.ObjectId(user) : null;

        // Create a new customization object
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
            user: userId // Assign the processed userId here
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

