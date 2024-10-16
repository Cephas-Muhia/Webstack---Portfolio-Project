const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { flavor, user } = req.body;

    // Create a new order with the provided details
    const newOrder = new Order({
      user, // Assume the user is authenticated and we get the user ID from the middleware
      cakeFlavor: flavor,
      orderDate: Date.now(),
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

module.exports = { createOrder };

