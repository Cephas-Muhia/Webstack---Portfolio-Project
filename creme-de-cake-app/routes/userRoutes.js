const express = require('express');
const { updatePreferredFlavors } = require('../controllers/userController');

const router = express.Router();

// Update preferred flavors
router.post('/preferred-flavors', updatePreferredFlavors);

module.exports = router;

