const express = require('express');
const router = express.Router();
const Cake = require('../models/Cake');
const Customization = require('../models/Customization');
const Order = require('../models/Order');
const User = require('../models/User');

// -------------------- STATIC ROUTES -------------------- //

// Home - Sweet Start
//router.get('/Home.js', (req, res) => {
  //res.send('Welcome to Sweet Start');
//});

// Catalogue - Cake Wonderland
//router.get('/Catalogue.js', (req, res) => {
  //res.send('Explore Cake Wonderland');
//});

// Cake Customizer
//router.get('/Customize.js', (req, res) => {
  //res.send('Customize your cake');
//});

// Cart - Treat Basket
//router.get('/Cart.js', (req, res) => {
  //res.send('Your Treat Basket');
//});

// Checkout - Checkout Delight
//router.get('/Checkout.js', (req, res) => {
  //res.send('Wellcome to Checkout Delight');
//});

// My Profile
//router.get('/Profile.js', (req, res) => {
  //res.send('Your Profile');
//});


// -------------------- CRUD for Orders -------------------- //

// POST route to create a new order

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});


module.exports = router;
