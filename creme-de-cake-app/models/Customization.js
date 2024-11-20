const mongoose = require('mongoose');

// Customization Schema definition
const CustomizationSchema = new mongoose.Schema({
  cakeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cake',
    required: false, // Not required
  },
  flavor: {
    type: [String],
    enum: ['Vanilla', 'Strawberry', 'Marble', 'Red Velvet', 'Black Forest', 'White Forest', 'Chocolate', 'Lemon'],
    validate: [flavorsLimit, 'You can select up to 3 flavors'],
  },
  customFlavor: {
    type: String,
    trim: true,
  },
  sizeInKgs: {
    type: Number,
    required: false, // Size is now optional
    default: 1,
  },
  icingType: {
    type: String,
    enum: ['Soft icing', 'Hard icing', 'Fresh cream'],
    default: 'Soft icing',
  },
  shape: {
    type: String,
    enum: ['Round', 'Square', 'Stacked', 'HeartShape'],
    default: 'Round',
  },
  decorations: {
    type: [String],
    enum: ['Sprinkles', 'Flowers', 'Candles', 'Edible Glitter'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  additionalDescription: {
    type: String,
    trim: true,
  },
  preferredColors: {
    type: [String],
  },
  designImage: {
    type: String, // URL or file path
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there’s a User model in the app
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Validator to ensure flavor selection limit
function flavorsLimit(val) {
  return val.length <= 3;
}

module.exports = mongoose.model('Customization', CustomizationSchema);

