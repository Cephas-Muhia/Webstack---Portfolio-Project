const Order = require('../models/Order');
const Customization = require('../models/Customization');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, cake, quantity, totalPrice, customization } = req.body;
    const newOrder = new Order({ user, cake, quantity, totalPrice, customization });
    await newOrder.save();
    res.status(201).json({ order: newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate('cake');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

