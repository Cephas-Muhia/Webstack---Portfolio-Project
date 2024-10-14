const express = require('express');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


// Serve static files
app.use(express.static(path.join(__dirname, 'creme-de-cake-frontend/dist')));
app.use(express.static(path.join(__dirname, 'creme-de-cake-frontend/public')));


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cakes', cakeRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/creme_de_cake')
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Handle frontend routing (for single-page applications)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'creme-de-cake-frontend', 'dist', 'index.html'));
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

