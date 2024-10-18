const Order = require('../models/Order');
const mongoose = require('mongoose');
const Customization = require('../models/Customization');

// Controller to handle creating an order
const createOrder = async (req, res) => {
    try {
        console.log('User:', req.user); // Check if req.user is populated

        // Destructure incoming data from request body
        const { name, CakeFlavor } = req.body;

        // Allowing access without user ID for testing purposes
        let userId;
        if (req.user) {
            userId = req.user._id; // Only get user ID if user is authenticated
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
        } else {
            console.log('No user logged in, order will be created without user association.');
        }

        const objectIdUser = userId ? mongoose.Types.ObjectId(userId) : null;

        const newOrder = new Order({
            user: objectIdUser, // This can be null if no user is logged in
            name,
            cakeFlavor: CakeFlavor,
            orderDate: Date.now(),
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ order: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order.' });
    }
};

   //Handle Empty or Invalid Fields.
  const createCustomization = async (req, res) => {
    try {
        const {
            cakeId,
            name,
            CakeFlavor,
            customFlavor,
            sizeInKgs,
            icingType,
            shape,
            celebrationExtras,
            message,
            additionalDescription,
            preferredColors,
            designImage,
        } = req.body;

        // Validate required fields
        if (!cakeId || !name || !CakeFlavor || !sizeInKgs || !icingType || !shape || !message) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        const newCustomization = new Customization({
            cakeId,
            name,
            CakeFlavor,
            customFlavor,
            sizeInKgs,
            icingType,
            shape,
            celebrationExtras,
            message,
            additionalDescription,
            preferredColors,
            designImage,
        });

        const savedCustomization = await newCustomization.save();
        res.status(201).json({ customization: savedCustomization });
    } catch (error) {
        console.error('Error creating customization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { createOrder };

