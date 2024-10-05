const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    collectionDate: { type: Date, required: true }, // New field for collection date
    status: { type: String, default: 'Pending' },
    customizationDetails: { type: Object }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

