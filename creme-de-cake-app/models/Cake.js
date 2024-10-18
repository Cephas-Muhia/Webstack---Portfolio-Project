const mongoose = require('mongoose');

// Define cake flavors with their respective categories and prices
const cakeData = {
    "Vanilla Cake": { price: 600, category: "Standard" },
    "Banana Cake": { price: 650, category: "Standard" },
    "Orange Cake": { price: 650, category: "Standard" },
    "Lemon Cake": { price: 700, category: "Standard" },
    "Pineapple Cake": { price: 750, category: "Standard" },
    "Butter Cake": { price: 700, category: "Standard" },
    "Cinnamon Cake": { price: 700, category: "Standard" },
    "Coconut Cake": { price: 750, category: "Standard" },
    "Mango Cake": { price: 750, category: "Standard" },
    "Raisin Cake": { price: 750, category: "Standard" },
    // Premium Cakes
    "Marble Cake": { price: 800, category: "Premium" },
    "Red Velvet Cake": { price: 900, category: "Premium" },
    "Chocolate Cake": { price: 900, category: "Premium" },
    "Strawberry Cake": { price: 950, category: "Premium" },
    "White Forest Cake": { price: 1000, category: "Premium" },
    "Black Forest Cake": { price: 1000, category: "Premium" },
    "Butterscotch Cake": { price: 950, category: "Premium" },
    "Peach Cake": { price: 950, category: "Premium" },
    "Apple Cinnamon Cake": { price: 900, category: "Premium" },
    "Almond Cake": { price: 1000, category: "Premium" },
    // Specialty Cakes
    "Fruit Cake": { price: 1200, category: "Specialty" },
    "Blueberry Cake": { price: 1300, category: "Specialty" },
    "Amarula Cake": { price: 1400, category: "Specialty" },
    "Coconut Rum Cake": { price: 1450, category: "Specialty" },
    "Coffee Cake": { price: 1500, category: "Specialty" },
    "Hazelnut Cake": { price: 1400, category: "Specialty" },
    "Tiramisu Cake": { price: 1500, category: "Specialty" },
    "Mint Chocolate Cake": { price: 1350, category: "Specialty" },
    "Baileys Cake": { price: 1450, category: "Specialty" },
    "Passion Fruit Cake": { price: 1300, category: "Specialty" },
    // Deluxe Cakes
    "Cheesecake": { price: 1600, category: "Deluxe" },
    "Pinacolada Cake": { price: 1700, category: "Deluxe" },
    "Carrot Cake": { price: 1800, category: "Deluxe" },
    "Eggless Cake": { price: 1900, category: "Deluxe" },
    "Blueberry Cheesecake": { price: 2000, category: "Deluxe" },
    "Mango Cheesecake": { price: 1900, category: "Deluxe" },
    "Blackcurrant Cheesecake": { price: 2000, category: "Deluxe" },
    "Salted Caramel Cake": { price: 1800, category: "Deluxe" },
    "Chocolate Truffle Cake": { price: 1900, category: "Deluxe" },
    "Peanut Butter Cake": { price: 1850, category: "Deluxe" }
};

// Cake schema
const cakeSchema = new mongoose.Schema({
    name: { type: String , required: true }, 
    CakeFlavor: { type: [String], required: true, enum: Object.keys(cakeData) },  // Allow multiple flavors
    image: { type: String },  // Image URL or path
    availability: { type: Boolean, default: true },  // Availability status
});

// Virtual field to calculate the final price based on selected flavors and weight (kgs)
cakeSchema.virtual('calculatePrice').get(function() {
    let highestPrice = 0;

    // Iterate over selected flavors and find the highest price
    this.CakeFlavor.forEach(flavor => {
        if (cakeData[flavor]?.price > highestPrice) {
            highestPrice = cakeData[flavor].price;
        }
    });

    return highestPrice; // Return the highest price
});

// Method to get the final price based on weight
cakeSchema.methods.getFinalPrice = function(numOfKgs) {
    return this.calculatePrice * numOfKgs; // Multiply highest price by number of kgs
};

// Method to get the category of the selected flavor
cakeSchema.methods.getCategory = function() {
    return this.CakeFlavor.map(flavor => cakeData[flavor]?.category || 'Unknown'); // Return categories for all flavors
};

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

