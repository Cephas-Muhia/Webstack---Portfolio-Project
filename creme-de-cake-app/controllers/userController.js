const User = require('../models/User');

// Update user profile
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user ID after token verification
        const { name, email, phoneNumber, birthday, address, preferredCakeFlavors } = req.body;

        const updatedData = { name, email, phoneNumber, birthday, address, preferredCakeFlavors };

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
        const { flavor } = req.body; 
        const userId = req.user.id; // Assuming req.user contains the authenticated user ID after token verification

        if (!flavor || typeof flavor !== 'string') {
            return res.status(400).json({ message: 'Invalid flavor' });
        }

        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!foundUser.preferredCakeFlavors.includes(flavor)) {
            foundUser.preferredCakeFlavors.push(flavor);
            await foundUser.save();
            return res.status(200).json({ message: 'Preferred flavor saved', flavors: foundUser.preferredCakeFlavors });
        }

        res.status(200).json({ message: 'Flavor already saved', flavors: foundUser.preferredCakeFlavors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving preferred flavor' });
    }
};

module.exports = { updateUser, savePreferredFlavor };


