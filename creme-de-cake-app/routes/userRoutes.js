const express = require('express');
const router = express.Router();

const { savePreferredFlavor } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Route to save preferred cake flavor for a user
router.post('/preferred-flavors', protect, savePreferredFlavor);

module.exports = router;

