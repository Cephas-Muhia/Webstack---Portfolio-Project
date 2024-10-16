const Cake = require('../models/Cake');

// Get all cakes
exports.getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new cake
exports.createCake = async (req, res) => {
  try {
    const { name, description, imgUrl, price } = req.body;
    const newCake = new Cake({ name, description, imgUrl, price });
    await newCake.save();
    res.status(201).json(newCake);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

