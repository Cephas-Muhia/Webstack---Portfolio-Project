const express = require('express');
const { getAllCakes, createCake } = require('../controllers/cakeController');

const router = express.Router();

// Get all cakes
router.get('/', getAllCakes);

// Create a new cake (admin route)
router.post('/', createCake);

module.exports = router;

