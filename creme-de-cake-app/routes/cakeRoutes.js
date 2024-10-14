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

 // -------------------- CRUD for User -------------------- //

// Create a new user (POST)
router.post('/users', async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword, birthday, address, preferredCakeFlavors, profilePicture } = req.body;

    // Check if password matches confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User with this email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password,
      birthday,
      address,
      preferredCakeFlavors,
      profilePicture
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Failed to create user' });
  }
});

// Get user by ID (GET)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ error: 'Failed to fetch user' });
  }
});

// Update user by ID (PUT)
router.put('/users/:id', async (req, res) => {
  try {
    const { name, phoneNumber, birthday, address, preferredCakeFlavors, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phoneNumber,
        birthday,
        address,
        preferredCakeFlavors,
        profilePicture
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ error: 'Failed to update user' });
  }
});

// Delete user by ID (DELETE)
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

// User login (POST)
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Failed to login' });
  }
});

// -------------------- CRUD for Cakes -------------------- //

// Create a new cake (POST)
router.post('/cakes', async (req, res) => {
  try {
    const {
      CakeFlavor,
      description,
      basePrice,
      image,
      categories,
      icingOptions,  // List of icing options for the cake
      availability,  // Availability status (optional)
      ratings,  // Average ratings (optional)
      reviews,  // List of reviews (optional)
      customizable  // Whether the cake is customizable
    } = req.body;

    // Validate required fields
    if (!CakeFlavor || !basePrice) {
      return res.status(400).send({ error: 'Missing required fields: CakeFlavor or basePrice' });
    }

    // Create a new cake with the provided details
    const newCake = new Cake({
      CakeFlavor,
      description,
      basePrice,
      image,
      categories,
      icingOptions,  // Optional icing options
      availability: availability !== undefined ? availability : true,  // Default to true if not provided
      ratings: ratings || 0,  // Default rating to 0 if not provided
      reviews: reviews || [],  // Default to an empty array if no reviews are provided
      customizable
    });

    await newCake.save();
    res.status(201).send(newCake);  // Send the created cake back in the response
  } catch (error) {
    console.error('Error creating cake:', error);  // Log the error for debugging
    res.status(500).send({ error: 'Failed to create cake' });  // Respond with an error message
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
    const {
      cakeId,
      flavor,
      sizeInKgs,
      decorations,
      icingType,
      shape,
      photo,
      CelebrationExtras,  // New field for extras like sprinkles or candles
      message,  // New field for custom cake message
      AdditionalDescription,  // New field for extra customization instructions
      preferredColors  // New field for preferred colors of the cake
    } = req.body;

    // Validate required fields
    if (!cakeId || !sizeInKgs || !icingType || !shape) {
      return res.status(400).send({ error: 'Missing required fields: cakeId, sizeInKgs, icingType, or shape' });
    }

    // Validate sizeInKgs to ensure it's a positive number
    if (sizeInKgs <= 0) {
      return res.status(400).send({ error: 'Cake size must be greater than zero' });
    }

    // Create a new customization with the provided details
    const newCustomization = new Customization({
      cakeId,
      flavor,
      sizeInKgs,
      decorations,
      icingType,
      shape,
      photo,
      CelebrationExtras,  // Optional celebration extras
      message,  // Optional custom message
      AdditionalDescription,  // Optional extra customization description
      preferredColors  // Optional preferred colors for the cake
    });

    await newCustomization.save();
    res.status(201).send(newCustomization); // Send the created customization back in the response
  } catch (error) {
    console.error('Error creating customization:', error); // Log the error for debugging
    res.status(500).send({ error: 'Failed to create customization' }); // Respond with an error message
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
    const {
      userId,
      cakeId,
      quantity,
      collectionDate,
      icing,
      size,
      shape,
      CelebrationExtras,
      AdditionalDescription,
      customMessage,
      preferredColors,
      price
    } = req.body;

    // Validate required fields
    if (!userId || !cakeId || !quantity || !collectionDate || !price) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Validate quantity and price
    if (quantity <= 0 || price <= 0) {
      return res.status(400).send({ error: 'Quantity and price must be greater than zero' });
    }

    // Calculate total price based on price per cake and quantity
    const totalPrice = price * quantity;

    // Create a new order using the provided details
    const newOrder = new Order({
      userId,
      cakeId,
      quantity,
      totalPrice,
      icing,
      size,
      shape,
      CelebrationExtras,
      AdditionalDescription,
      customMessage,
      preferredColors,
      collectionDate,
      customizationDetails: {
        icing,
        size,
        shape,
        CelebrationExtras,
        AdditionalDescription,
        customMessage,
        preferredColors
      }
    });

    await newOrder.save();
    res.status(201).send(newOrder); // Send the created order back in the response
  } catch (error) {
    console.error('Error creating order:', error); // Log the error for debugging
    res.status(500).send({ error: 'Failed to create order' }); // Respond with error message
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

