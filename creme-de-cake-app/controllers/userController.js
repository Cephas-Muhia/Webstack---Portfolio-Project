const User = require('../models/User');

// Update preferred flavors
exports.updatePreferredFlavors = async (req, res) => {
  try {
    const { flavor, user } = req.body;
    await User.updateOne({ _id: user }, { $addToSet: { preferredCakeFlavors: flavor } });
    res.status(200).json({ message: 'Preferred flavor updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

