const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake' },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number },
  orderDate: { type: Date, default: Date.now },
  collectionDate: Date,
  customization: { type: mongoose.Schema.Types.ObjectId, ref: 'Customization' },
});

// Method to calculate total price
orderSchema.methods.calculateTotalPrice = async function() {
  const customization = await this.model('Customization').findById(this.customization).populate('cakeId');
  const cake = await this.model('Cake').findById(customization.cakeId);

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
  customization.celebrationExtras.forEach(extra => {
    const extraPrice = parseInt(extra.split(':')[1], 10);  // Extract price from 'Extra:Price'
    extrasPrice += extraPrice;
  });

  // 3. Calculate total price for the order
  const cakeBasePrice = basePricePerKg * customization.sizeInKgs;
  this.totalPrice = (cakeBasePrice + extrasPrice) * this.quantity;
  return this.totalPrice;
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

