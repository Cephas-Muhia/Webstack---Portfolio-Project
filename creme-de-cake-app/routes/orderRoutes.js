const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cake = require('../models/Cake'); 

const { createOrder } = require('../controllers/orderController'); 
const protect = require('../middleware/authMiddleware'); //path is correct

// Public route for creating orders (no authentication required)
router.post('/orders', createOrder);

// Route to create an order
//router.post('/', protect, createOrder); // `protect` middleware ensures the user is authenticated

 //Receiving api calls from Catalogue page.
router.post('/orders', async (req, res) => {
    try {
        const { cake, flavor, user } = req.body;

        // Log incoming data
        console.log('Incoming order data:', req.body);

        // Check for required fields
        if (!cake || !flavor || !user) {
            return res.status(400).json({ message: 'Missing required fields: cake, flavor, or user' });
        }

        // Create a new order instance
        const newOrder = new Order({
            cake,
            user,
            customization: null,  // Assuming customization happens later
            totalPrice: null,      // Will be calculated later
        });

        // Save the order
        await newOrder.save();

        // Log success message
        console.log('Order saved successfully:', newOrder);

        // Send the new order back
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);  // Log the full error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



module.exports = router; 

