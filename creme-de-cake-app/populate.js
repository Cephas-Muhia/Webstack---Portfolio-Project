const mongoose = require('mongoose');
const User = require('./models/User');
const Cake = require('./models/Cake');
const Order = require('./models/Order');
const Customization = require('./models/Customization');

mongoose.connect('mongodb://localhost:27017/creme_de_cake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB connected successfully!');

    // Sample user
    const user = new User({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phoneNumber: '0722000000',
        password: 'hashed_password',  // Ensure password is hashed in production
        birthday: new Date(1990, 5, 15),
        address: '123 Baker Street, Nairobi',
        preferredCakeFlavors: ['Chocolate', 'Red Velvet'],
        profilePicture: 'https://example.com/profile/jane.jpg'
    });

    await user.save();

    // Sample cake with reviews
    const cake = new Cake({
        CakeFlavor: 'Chocolate Delight',
        description: 'A rich chocolate cake perfect for birthdays and celebrations.',
        basePrice: 2000,  // Base price in Ksh
        image: 'https://example.com/chocolate_cake.jpg',
        categories: ['Birthday', 'Celebration'],
        icingOptions: ['Hard icing', 'Soft icing', 'Fresh cream'],
        ratings: 4.5,  // Average rating
        reviews: [
            {
                userId: user._id,
                reviewText: 'The best chocolate cake I’ve ever had!',
                rating: 5
            }
        ],
        availability: true
    });

    await cake.save();

    // Sample customization
    const customization = new Customization({
        cakeId: cake._id,
        flavor: 'Chocolate',  // Predefined flavor
        customFlavor: 'Mint Chocolate',  // Custom flavor by user
        sizeInKgs: 2.5,
        decorations: ['Sprinkles', 'Chocolate Chips'],
        icingType: 'Fresh cream',
        shape: 'Round',
        CelebrationExtras: ['Candles', 'Edible Glitter'],
        message: 'Happy Birthday Jane!',
        AdditionalDescription: 'Add extra chocolate layers',
        preferredColors: ['Brown', 'Gold'],
        designImage: 'https://example.com/custom_cake_design.jpg'
    });

    await customization.save();

    // Sample order
    const order = new Order({
        userId: user._id,
        cakeId: cake._id,
        cakeName: 'Chocolate Delight',
        icing: 'Fresh cream',
        size: 2.5,  // Size in kilograms
        shape: 'Round',
        CelebrationExtras: ['Candles', 'Edible Glitter'],
        AdditionalDescription: 'Extra chocolate layers for a rich taste',
        image: 'https://example.com/chocolate_cake_order.jpg',
        customMessage: 'Happy Birthday Jane!',
        preferredColors: ['Brown', 'Gold'],
        price: 2000,  // Price per cake in Ksh
        quantity: 1,  // Number of cakes
        totalPrice: 2000,  // Total price in Ksh (1 * 2000 Ksh)
        orderDate: new Date(),  // Current date
        collectionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  // 3 days from now
        customizationDetails: customization  // Link to customization
    });

    await order.save();

    console.log('Data populated successfully!');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error populating data:', err);
});

