const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customizationSchema = new Schema({
  flavor: { type: String, required: true },  // Initial flavor chosen by the user
  customFlavor: { type: String },            // If the user selects a custom flavor
  sizeInKgs: { type: Number, required: true }, // Cake size in kilograms
  decorations: [{ type: String, enum: ['Sprinkles', 'Flowers', 'Candles', 'Edible Glitter'] }], // Selected decorations
  icingType: { type: String, enum: ['Hard icing', 'Soft icing', 'Fresh cream'], required: true }, // Type of icing
  shape: { type: String, enum: ['Square', 'Round', 'Stacked', 'HeartShape'], required: true }, // Shape of the cake
  preferredColors: [{ type: String }],       // Array to store multiple colors
  designImage: { type: String },             // Path to uploaded cake design image
  message: { type: String, maxlength: 50 },  // Custom message for the cake
  additionalDescription: { type: String },   // Additional instructions for customization
  name: { type: String, required: true },    // Cake name (selected from the catalogue)
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },  // Reference to the user who customized
  createdAt: { type: Date, default: Date.now },  // Timestamp of the customization
});

const Customization = mongoose.model('Customization', customizationSchema);
module.exports = Customization;

