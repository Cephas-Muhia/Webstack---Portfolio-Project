const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Customization = require('../models/Customization');
const Cake = require('../models/Cake');  

// POST request to create a new customization (for both Catalogue and Customize page)
router.post('/', async (req, res) => {
    const {
        flavor,
        customFlavor = '', // Default empty string if no custom flavor is provided
        sizeInKgs = 1, // Default size in kg if not provided
        decorations = [], // Default empty array if no decorations are selected
        icingType = 'Soft icing', // Default icing type
        shape = 'Round', // Default shape
        message = '', // Default empty string for the message
        AdditionalDescription = '', // Default empty string for additional description
        preferredColors = [], // Default empty array for preferred colors
        designImage = null, // Default null for design image if not provided
        user = null // Default null for user if not provided
    } = req.body;

    try {
        // Validate required fields
        if (!flavor || flavor.length === 0) {
            return res.status(400).json({ error: 'At least one flavor is required' });
        }

        // Create a new cake if no cakeId is provided
        let cakeId;
        if (!req.body.cakeId) {
            // Assuming you can create a new Cake instance with default or user-specified data
            const newCake = new Cake({
                name: "New Cake", // Set default or dynamic name
                description: "Default Cake Description", // Default or dynamic description
                basePrice: 500, // Default base price or dynamic calculation
                sizeInKgs: sizeInKgs, // Size passed in customization
                // Add any other default fields or logic for the cake creation
            });

            const savedCake = await newCake.save();
            cakeId = savedCake._id; // Get the newly created cake ID
        } else {
            cakeId = req.body.cakeId; // Use the provided cakeId if it's given
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
            message,
            AdditionalDescription,
            preferredColors,
            designImage,
            user: userId,
            cakeId: mongoose.Types.ObjectId(cakeId) // Ensure cakeId is valid
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
