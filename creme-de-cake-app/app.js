const express = require('express');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); 
const customizationRoutes = require('./routes/customizationRoutes')
const multer = require('multer');
const bodyParser = require('body-parser');
const Customization = require('./models/Customization');

require('./config/passport')(passport); // Passport configuration

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'creme-de-cake-frontend/dist')));
app.use(express.static(path.join(__dirname, 'creme-de-cake-frontend/public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api', uploadRoutes);
app.use('/api', customizationRoutes);

// MongoDB connection
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
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });
// POST route for saving customizations
app.post('/api/customizations', async (req, res) => {
  try {
    const customizationData = req.body; // Get the customization data from the request
    const newCustomization = new Customization(customizationData);
    await newCustomization.save();
    res.status(201).json(newCustomization); // Respond with the created customization
  } catch (error) {
    res.status(400).json({ message: 'Error saving customization', error });
  }
});

// Handle file uploads separately if necessary
app.post('/api/uploads', upload.single('designImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ filePath: req.file.path }); // Return file path for the frontend
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle frontend routing for a single-page application (SPA)
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

