const express = require('express');
const router = express.Router();
const Cake = require('../models/Cake');
const Customization = require('../models/Customization');
const Order = require('../models/Order');

// -------------------- STATIC ROUTES -------------------- //

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

// -------------------- CRUD for Cakes -------------------- //

// Create a new cake (POST)
router.post('/cakes', async (req, res) => {
  try {
    const { name, description, basePrice, image, categories, customizable } = req.body;
    const newCake = new Cake({
      name,
      description,
      basePrice,
      image,
      categories,
      customizable
    });
    await newCake.save();
    res.status(201).send(newCake);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create cake' });
  }
});

// Get all cakes (GET)
router.get('/cakes', async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).send(cakes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch cakes' });
  }
});

// Get a specific cake by ID (GET)
router.get('/cakes/:id', async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).send({ error: 'Cake not found' });
    res.status(200).send(cake);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch cake' });
  }
});

// Update a cake by ID (PUT)
router.put('/cakes/:id', async (req, res) => {
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCake) return res.status(404).send({ error: 'Cake not found' });
    res.status(200).send(updatedCake);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update cake' });
  }
});

// Delete a cake by ID (DELETE)
router.delete('/cakes/:id', async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) return res.status(404).send({ error: 'Cake not found' });
    res.status(200).send({ message: 'Cake deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete cake' });
  }
});

// -------------------- CRUD for Customizations -------------------- //

// Create a new customization (POST)
router.post('/customizations', async (req, res) => {
  try {
    const { cakeId, flavor, sizeInKgs, decorations, icingType, shape, photo } = req.body;
    const newCustomization = new Customization({
      cakeId,
      flavor,
      sizeInKgs,
      decorations,
      icingType,
      shape,
      photo
    });
    await newCustomization.save();
    res.status(201).send(newCustomization);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create customization' });
  }
});

// Get all customizations (GET)
router.get('/customizations', async (req, res) => {
  try {
    const customizations = await Customization.find();
    res.status(200).send(customizations);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch customizations' });
  }
});

// Get a specific customization by ID (GET)
router.get('/customizations/:id', async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id);
    if (!customization) return res.status(404).send({ error: 'Customization not found' });
    res.status(200).send(customization);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch customization' });
  }
});

// Update a customization by ID (PUT)
router.put('/customizations/:id', async (req, res) => {
  try {
    const updatedCustomization = await Customization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomization) return res.status(404).send({ error: 'Customization not found' });
    res.status(200).send(updatedCustomization);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update customization' });
  }
});

// Delete a customization by ID (DELETE)
router.delete('/customizations/:id', async (req, res) => {
  try {
    const deletedCustomization = await Customization.findByIdAndDelete(req.params.id);
    if (!deletedCustomization) return res.status(404).send({ error: 'Customization not found' });
    res.status(200).send({ message: 'Customization deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete customization' });
  }
});

// -------------------- CRUD for Orders -------------------- //

// Create a new order (POST)
router.post('/orders', async (req, res) => {
  try {
    const { userId, cakeId, quantity, totalPrice, customizationDetails, collectionDate } = req.body;
    const newOrder = new Order({
      userId,
      cakeId,
      quantity,
      totalPrice,
      customizationDetails,
      collectionDate
    });
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create order' });
  }
});

// Get all orders (GET)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch orders' });
  }
});

// Get a specific order by ID (GET)
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ error: 'Order not found' });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch order' });
  }
});

// Update an order by ID (PUT)
router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).send({ error: 'Order not found' });
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update order' });
  }
});

// Delete an order by ID (DELETE)
router.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).send({ error: 'Order not found' });
    res.status(200).send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete order' });
  }
});

module.exports = router;

