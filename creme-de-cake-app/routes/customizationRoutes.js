const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router();
const Customization = require('../models/Customization');

// POST request to create a new customization (for both Catalogue and Customize page)
router.post('/', async (req, res) => {
    const {
        flavor,
        customFlavor = '',
        sizeInKgs = 1, // Default size in kg if not provided
        decorations = [],
        icingType = 'Soft icing', // Default icing type
        shape = 'Round', // Default shape
        CelebrationExtras = [],
        message = '',
        AdditionalDescription = '',
        preferredColors = [],
        designImage = null,
        user = null,
        cakeId // Assuming cakeId is required for creating customization
    } = req.body;

    try {
        // Validate required fields
        if (!flavor) {
            return res.status(400).json({ error: 'Flavor is required' });
        }

        // Ensure cakeId is provided and is a valid ObjectId
        if (!cakeId || !mongoose.Types.ObjectId.isValid(cakeId)) {
            return res.status(400).json({ error: 'Invalid or missing cakeId' });
        }

        // Process the user field to ensure a valid ObjectId or set it to null
        const userId = user && mongoose.Types.ObjectId.isValid(user) ? mongoose.Types.ObjectId(user) : null;

        // Create a new customization object
        const newCustomization = new Customization({
            flavor,
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
            user: userId,
            cakeId: mongoose.Types.ObjectId(cakeId) // Ensure cakeId is a valid ObjectId
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

