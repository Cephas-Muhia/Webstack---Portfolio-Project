const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake' },
  quantity: Number,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  collectionDate: Date,
  customization: { type: mongoose.Schema.Types.ObjectId, ref: 'Customization' },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

