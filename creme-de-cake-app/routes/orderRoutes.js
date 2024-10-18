const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Protect middleware

//Public  Route to create an order (protected by authMiddleware)
router.post('/orders', createOrder);

// Route to create an order
//router.post('/', protect, createOrder); // `protect` middleware ensures the user is authenticated

 //Receiving api calls from Catalogue page.
router.post('/orders', async (req, res) => {
  try {
    const { name, CakeFlavor, user } = req.body;  // Destructure data from the request body

    // Create a new order with the provided details
    const newOrder = new Order({
      name: cakename,             // Cake name
      CakeFlavor: flavor,         // Selected flavor
      user: user,             // Placeholder for actual user ID
      // Optionally add more fields here if needed, like order date, etc.
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order, including its generated _id
    res.status(201).json(savedOrder);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});


module.exports = router; 

