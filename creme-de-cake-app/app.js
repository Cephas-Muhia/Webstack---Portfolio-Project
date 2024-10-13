const express = require('express');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cakeRoutes = require('./routes/cakeRoutes'); // Import your cake routes
require('./config/passport')(passport); // Passport config

const app = express();

// Serve static files
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors()); // Enable CORS for all routes
app.use('/routes',cakeRoutes );

mongoose.connect('mongodb://localhost:27017/creme_de_cake', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});


// Handle 404 - Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Handle 500 - Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

