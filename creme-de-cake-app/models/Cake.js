const mongoose = require('mongoose');

// Define cake flavors with their respective prices
const cakeData = {
    // Standard Cakes
    "Vanilla Cake": 600,
    "Banana Cake": 650,
    "Orange Cake": 650,
    "Lemon Cake": 700,
    "Pineapple Cake": 750,
    "Butter Cake": 700,
    "Cinnamon Cake": 700,
    "Coconut Cake": 750,
    "Mango Cake": 750,
    "Raisin Cake": 750,
    // Premium Cakes
    "Marble Cake": 800,
    "Red Velvet Cake": 900,
    "Chocolate Cake": 900,
    "Strawberry Cake": 950,
    "White Forest Cake": 1000,
    "Black Forest Cake": 1000,
    "Butterscotch Cake": 950,
    "Peach Cake": 950,
    "Apple Cinnamon Cake": 900,
    "Almond Cake": 1000,
    // Specialty Cakes
    "Fruit Cake": 1200,
    "Blueberry Cake": 1300,
    "Amarula Cake": 1400,
    "Coconut Rum Cake": 1450,
    "Coffee Cake": 1500,
    "Hazelnut Cake": 1400,
    "Tiramisu Cake": 1500,
    "Mint Chocolate Cake": 1350,
    "Baileys Cake": 1450,
    "Passion Fruit Cake": 1300,
    // Deluxe Cakes
    "Cheesecake": 1600,
    "Pinacolada Cake": 1700,
    "Carrot Cake": 1800,
    "Eggless Cake": 1900,
    "Blueberry Cheesecake": 2000,
    "Mango Cheesecake": 1900,
    "Blackcurrant Cheesecake": 2000,
    "Salted Caramel Cake": 1800,
    "Chocolate Truffle Cake": 1900,
    "Peanut Butter Cake": 1850
};

// Cake schema
const cakeSchema = new mongoose.Schema({
    CakeFlavor: { type: [String], required: true },  // Multiple flavors can be selected
    image: { type: String },  // Image URL or path
    availability: { type: Boolean, default: true },  // Availability status
});

// Virtual field to calculate the final price based on selected flavors and weight (kgs)
cakeSchema.virtual('calculatePrice').get(function(numOfKgs) {
    let highestPrice = 0;

    // Iterate over selected flavors and find the highest price
    this.CakeFlavor.forEach(flavor => {
        if (cakeData[flavor] > highestPrice) {
            highestPrice = cakeData[flavor];
        }
    });

    // Multiply the highest flavor price by the number of kilograms
    return highestPrice * numOfKgs;
});

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

