const express = require('express');
const { createOrder, getOrdersByUser } = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get orders by user ID
router.get('/:userId', getOrdersByUser);

module.exports = router;

