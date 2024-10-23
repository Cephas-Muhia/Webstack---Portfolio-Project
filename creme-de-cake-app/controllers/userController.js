const User = require('../models/User');

// Update user profile
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user ID after token verification
        const updatedData = req.body;

        // Find the user by ID and update the necessary fields
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

// Save preferred flavor to user profile
const savePreferredFlavor = async (req, res) => {
    try {
        const { flavor, user } = req.body;

        // Find the user by ID
        const foundUser = await User.findById(user);

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the flavor to the user's preferred flavors if it doesn't already exist
        if (!foundUser.preferredCakeFlavors.includes(flavor)) {
            foundUser.preferredCakeFlavors.push(flavor);
            await foundUser.save();
        }

        res.status(200).json({ message: 'Preferred flavor saved', flavors: foundUser.preferredCakeFlavors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving preferred flavor', error });
    }
};

module.exports = { updateUser, savePreferredFlavor };

