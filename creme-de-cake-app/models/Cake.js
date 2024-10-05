const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number, required: true },
    image: { type: String },
    categories: [{ type: String }],
    customizable: { type: Boolean, default: false }
});

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

