const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake' },
    quantity: { type: Number, default: 1 }, // Default quantity to 1
    totalPrice: { type: Number },
    orderDate: { type: Date, default: Date.now },
    collectionDate: Date,
    customization: { type: mongoose.Schema.Types.ObjectId, ref: 'Customization' },
});

// Method to calculate total price
orderSchema.methods.calculateTotalPrice = async function() {
    try {
        const customization = await this.model('Customization').findById(this.customization).populate('cakeId');
        if (!customization) throw new Error('Customization not found');

        const cake = await this.model('Cake').findById(customization.cakeId);
        if (!cake) throw new Error('Cake not found');

        // 1. Check if custom flavor is chosen, otherwise use standard flavor
        let basePricePerKg = 0;
        if (customization.customFlavor) {
            // Extract custom flavor price from the string (e.g., "Custom flavor:1500")
            basePricePerKg = parseInt(customization.customFlavor.split(':')[1], 10);
        } else {
            // Use the highest standard flavor price
            basePricePerKg = cake.calculatePrice(customization.sizeInKgs);
        }

        // 2. Calculate celebration extras' price
        let extrasPrice = 0;
        if (customization.celebrationExtras) {
            customization.celebrationExtras.forEach(extra => {
                const extraPrice = parseInt(extra.split(':')[1], 10); // Extract price from 'Extra:Price'
                extrasPrice += extraPrice;
            });
        }

        // 3. Calculate total price for the order
        const cakeBasePrice = basePricePerKg * customization.sizeInKgs;
        this.totalPrice = (cakeBasePrice + extrasPrice) * this.quantity;

        // Save the updated total price to the order
        await this.save(); // Save the updated order with total price
        return this.totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error.message);
        throw error; // Re-throw to handle in the calling function
    }
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

