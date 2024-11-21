const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  flavors: {
    type: [String],
    validate: [(val) => val.length <= 3, 'Maximum of 3 flavors allowed.'],
  },
  customFlavor: { type: String, default: '' },
  sizeInKgs: { type: Number, required: true, min: 0.5 },
  decorations: { type: [String], default: [] },
  icingType: { type: String, enum: ['Soft icing', 'Hard icing', 'Fresh cream'], required: true },
  shape: { type: String, enum: ['Round', 'Square', 'Stacked', 'HeartShape'], required: true },
  message: { type: String, default: '' },
  additionalDescription: { type: String, default: '' },
  preferredColors: { type: [String], default: [] },
  designImage: { type: String, default: '' }, // Stores the image URL or file path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Customization', customizationSchema);

