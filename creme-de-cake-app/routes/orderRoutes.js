const express = require('express');
const router = express.Router();

const { createOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// Route to create an order
router.post('/', protect, createOrder); // `protect` middleware ensures the user is authenticated

module.exports = router;

