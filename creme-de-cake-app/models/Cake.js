const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    CakeFlavor: { type: String, required: true },  // Flavor of the cake
    description: { type: String },  // Description of the cake
    basePrice: { type: Number, required: true },  // Base price of the cake
    image: { type: String },  // Image URL or path
    categories: [{ type: String }],  // Categories like "Birthday", "Wedding", etc.
    icingOptions: [{ type: String }],  // List of icing options (if fixed)
    availability: { type: Boolean, default: true },  // Availability status
    ratings: { type: Number, default: 0 },  // Average rating
    reviews: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number }
    }]  // Customer reviews
});

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

