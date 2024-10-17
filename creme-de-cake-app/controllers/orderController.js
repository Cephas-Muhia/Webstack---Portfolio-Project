const Order = require('../models/Order');

// Catalogue Controller Logic
const createOrder = async (req, res) => {
    try {
        const { cake, flavor, user } = req.body; // Ensure you're extracting the fields correctly

        // You can add validation for the incoming data here

        // Create a new order with the provided details
        const newOrder = new Order({
            user, // The user ID should come from req.user set by the middleware (if using auth)
            cake, // Include the cake ID
            cakeFlavor: flavor,
            orderDate: Date.now(),
        });

        // Save the new order in the database
        const savedOrder = await newOrder.save();
        res.status(201).json({ order: savedOrder }); // Send back the newly created order
    } catch (error) {
        console.error('Error creating order:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating order', error });
    }
};

module.exports = { createOrder };

