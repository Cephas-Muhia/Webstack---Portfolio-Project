const express = require('express');
const router = express.Router();

// Home - Sweet Start
router.get('/', (req, res) => {
  res.send('Welcome to Sweet Start');
});

// Catalogue - Cake Wonderland
router.get('/catalogue', (req, res) => {
  res.send('Explore Cake Wonderland');
});

// Cake Customizer
router.get('/customize', (req, res) => {
  res.send('Customize your cake');
});

// Cart - Treat Basket
router.get('/cart', (req, res) => {
  res.send('Your Treat Basket');
});

// Checkout - Checkout Delight
router.get('/checkout', (req, res) => {
  res.send('Proceed to Checkout Delight');
});

// My Profile
router.get('/profile', (req, res) => {
  res.send('Your Profile');
});

module.exports = router;

