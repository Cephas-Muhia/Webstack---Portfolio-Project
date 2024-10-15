const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
    cakeName: { type: String, required: true },  // Name of the cake
    icing: {
        type: String,
        enum: ['Hard icing', 'Soft icing', 'Fresh cream'],
        required: true
    },
    size: { type: Number, required: true },  // Size in kilograms
    shape: {
        type: String,
        enum: ['Square', 'Round', 'Stacked'],
        required: true
    },
    CelebrationExtras: [{ 
        name: { type: String, enum: ['Sprinkles', 'Flowers', 'Candles', 'Edible Glitter'] },
        price: { type: Number }
    }],  // Extras with prices
    AdditionalDescription: { type: String },  // Additional description for the cake
    image: { type: String },  // Image URL or path
    customMessage: { type: String },  // Custom message on the cake
    preferredColors: [{ type: String }],  // Preferred colors for the cake
    price: { type: Number, required: true },  // Price of the cake
    quantity: { type: Number, required: true },  // Number of cakes ordered
    totalPrice: { type: Number, required: true },  // Total price for the order
    orderDate: { type: Date, default: Date.now },  // Date the order was placed
    collectionDate: { type: Date, required: true },  // Collection/pickup date
    status: { type: String, default: 'Pending' },  // Status of the order
    customizationDetails: { 
        type: mongoose.Schema.Types.Mixed,  // Customization details for flexibility
        required: true 
    },
});

// Add default prices to the available extras
orderSchema.pre('save', function(next) {
    if (this.CelebrationExtras && this.CelebrationExtras.length) {
        this.CelebrationExtras.forEach(extra => {
            switch(extra.name) {
                case 'Sprinkles':
                    extra.price = 300;
                    break;
                case 'Flowers':
                    extra.price = 400;
                    break;
                case 'Candles':
                    extra.price = 250;
                    break;
                case 'Edible Glitter':
                    extra.price = 500;
                    break;
            }
        });
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

