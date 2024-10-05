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
        password: 'hashed_password'
    });

    await user.save();

    // Sample cake
    const cake = new Cake({
        name: 'Chocolate Delight',
        description: 'A rich chocolate cake.',
        basePrice: 20,
        image: 'https://example.com/chocolate_cake.jpg',
        categories: ['Birthday', 'Celebration'],
        customizable: true
    });

    await cake.save();

    // Sample customization
    const customization = new Customization({
        cakeId: cake._id,
        flavor: 'Chocolate',
        sizeInKgs: 2.5,
        decorations: ['Sprinkles', 'Chocolate Chips'],
        icingType: 'Fresh cream',
        shape: 'Round',
        photo: 'https://example.com/custom_cake.jpg'
    });

    await customization.save();

    // Sample order
const order = new Order({
    userId: user._id,
    cakeId: cake._id,
    quantity: 1,
    totalPrice: 2000, // Updated to Ksh
    orderDate: new Date(), // Optional, can be removed if not needed
    collectionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Set to 3 days from now
    customizationDetails: customization
});


    await order.save();

    console.log('Data populated successfully!');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error populating data:', err);
});


