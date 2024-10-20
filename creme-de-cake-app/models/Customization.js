const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customizationSchema = new Schema({
  flavor: { type: String, required: true },  // Initial flavor chosen by the user
  customFlavor: { type: String },            // If the user selects a custom flavor
  sizeInKgs: { type: Number },               // Will be filled in later
  decorations: { type: String },             // Will be filled in later
  icingType: { type: String, enum: ['Hard icing', 'Soft icing', 'Fresh cream'] },  // Will be filled in later
  shape: { type: String, enum: ['Square', 'Round', 'Stacked', 'HeartShape'] },     // Will be filled in later
  preferredColors: { type: String },          // Will be filled in later
  designImage: { type: String },              // Will be filled in later
  message: { type: String },                 // Custom message for the cake
  additionalDescription: { type: String },   // Additional details for customization
  name: { type: String, required: true },    // Cake name (selected in the Catalogue)
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },  // Reference to the user
  createdAt: { type: Date, default: Date.now },  // Timestamp of the customization
});

const Customization = mongoose.model('Customization', customizationSchema);
module.exports = Customization;

