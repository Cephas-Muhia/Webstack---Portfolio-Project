const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
    cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },  // Reference to Cake
    flavor: { type: String },  // Selected flavor from the options
    customFlavor: { type: String },  // User-defined custom flavor
    sizeInKgs: { type: Number, required: true },  // Cake size in kilograms
    decorations: [{ type: String }],  // Selected decorations
    icingType: {
        type: String,
        enum: ['Hard icing', 'Soft icing', 'Fresh cream'],
        required: true
    },
    shape: {
        type: String,
        enum: ['Square', 'Round', 'Stacked', 'HeartShape'],
        required: true
    },
    CelebrationExtras: [{ type: String }],  // Extras like sprinkles, candles, etc.
    message: { type: String },  // Custom message for the cake
    AdditionalDescription: { type: String },  // Additional details for customization
    preferredColors: [{ type: String }],  // Preferred colors for the cake design
    designImage: { type: String }  // Uploaded image for the desired cake design
});

const Customization = mongoose.model('Customization', customizationSchema);
module.exports = Customization;

