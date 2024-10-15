const mongoose = require('mongoose');

// Define cake flavors with their respective prices and categories
const cakeData = {
    // Standard Cakes
    "Vanilla Cake": { price: 600, category: "Standard Cakes" },
    "Banana Cake": { price: 650, category: "Standard Cakes" },
    "Orange Cake": { price: 650, category: "Standard Cakes" },
    "Lemon Cake": { price: 700, category: "Standard Cakes" },
    "Pineapple Cake": { price: 750, category: "Standard Cakes" },
    "Butter Cake": { price: 700, category: "Standard Cakes" },
    "Cinnamon Cake": { price: 700, category: "Standard Cakes" },
    "Coconut Cake": { price: 750, category: "Standard Cakes" },
    "Mango Cake": { price: 750, category: "Standard Cakes" },
    "Raisin Cake": { price: 750, category: "Standard Cakes" },
    // Premium Cakes
    "Marble Cake": { price: 800, category: "Premium Cakes" },
    "Red Velvet Cake": { price: 900, category: "Premium Cakes" },
    "Chocolate Cake": { price: 900, category: "Premium Cakes" },
    "Strawberry Cake": { price: 950, category: "Premium Cakes" },
    "White Forest Cake": { price: 1000, category: "Premium Cakes" },
    "Black Forest Cake": { price: 1000, category: "Premium Cakes" },
    "Butterscotch Cake": { price: 950, category: "Premium Cakes" },
    "Peach Cake": { price: 950, category: "Premium Cakes" },
    "Apple Cinnamon Cake": { price: 900, category: "Premium Cakes" },
    "Almond Cake": { price: 1000, category: "Premium Cakes" },
    // Specialty Cakes
    "Fruit Cake": { price: 1200, category: "Specialty Cakes" },
    "Blueberry Cake": { price: 1300, category: "Specialty Cakes" },
    "Amarula Cake": { price: 1400, category: "Specialty Cakes" },
    "Coconut Rum Cake": { price: 1450, category: "Specialty Cakes" },
    "Coffee Cake": { price: 1500, category: "Specialty Cakes" },
    "Hazelnut Cake": { price: 1400, category: "Specialty Cakes" },
    "Tiramisu Cake": { price: 1500, category: "Specialty Cakes" },
    "Mint Chocolate Cake": { price: 1350, category: "Specialty Cakes" },
    "Baileys Cake": { price: 1450, category: "Specialty Cakes" },
    "Passion Fruit Cake": { price: 1300, category: "Specialty Cakes" },
    // Deluxe Cakes
    "Cheesecake": { price: 1600, category: "Deluxe Cakes" },
    "Pinacolada Cake": { price: 1700, category: "Deluxe Cakes" },
    "Carrot Cake": { price: 1800, category: "Deluxe Cakes" },
    "Eggless Cake": { price: 1900, category: "Deluxe Cakes" },
    "Blueberry Cheesecake": { price: 2000, category: "Deluxe Cakes" },
    "Mango Cheesecake": { price: 1900, category: "Deluxe Cakes" },
    "Blackcurrant Cheesecake": { price: 2000, category: "Deluxe Cakes" },
    "Salted Caramel Cake": { price: 1800, category: "Deluxe Cakes" },
    "Chocolate Truffle Cake": { price: 1900, category: "Deluxe Cakes" },
    "Peanut Butter Cake": { price: 1850, category: "Deluxe Cakes" }
};

// Cake schema
const cakeSchema = new mongoose.Schema({
    CakeFlavor: [{ type: String, required: true }],  // Multiple flavors can be selected
    description: { type: String },  // Description of the cake
    image: { type: String },  // Image URL or path
    availability: { type: Boolean, default: true },  // Availability status
    ratings: { type: Number, default: 0 },  // Average rating
    reviews: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number }
    }]  // Customer reviews
});

// Add a virtual field to calculate the final price based on selected flavors and weight (kgs)
cakeSchema.virtual('calculatePrice').get(function(numOfKgs) {
    let highestPrice = 0;

    // Iterate over selected flavors and find the highest price
    this.CakeFlavor.forEach(flavor => {
        if (cakeData[flavor]?.price > highestPrice) {
            highestPrice = cakeData[flavor].price;
        }
    });

    // Multiply the highest flavor price by the number of kilograms
    return highestPrice * numOfKgs;
});

// Add a virtual field to automatically determine the category based on flavor
cakeSchema.virtual('category').get(function() {
    let categories = new Set();

    // Iterate over selected flavors and gather their respective categories
    this.CakeFlavor.forEach(flavor => {
        if (cakeData[flavor]?.category) {
            categories.add(cakeData[flavor].category);
        }
    });

    return Array.from(categories);
});

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

