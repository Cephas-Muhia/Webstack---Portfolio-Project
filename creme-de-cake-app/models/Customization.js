const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  cakeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cake', 
    required: true 
  }, // Reference to the Cake model
  name: { 
    type: String, 
    required: true 
  }, // Name of the customization
  flavor: { 
    type: String, 
    required: true // Renamed for consistency 
  },  // Standard flavor (required field)
  customFlavor: { 
    type: String, 
    required: false // Custom flavor; no specific price enforcement
  },
  sizeInKgs: { 
    type: Number, 
    required: true // Size in kilograms (required field)
  }, 
  icingType: { 
    type: String, 
    enum: ['Hard icing', 'Soft icing', 'Fresh cream'], 
    required: true // Required icing type
  }, 
  shape: { 
    type: String, 
    enum: ['Square', 'Round', 'Stacked', 'HeartShape'], 
    required: true // Required cake shape
  }, 
  celebrationExtras: [{ 
    type: String 
  }], // Array to hold multiple extras; can store strings without price enforcement
  message: { 
    type: String, 
    required: true // Required message
  }, 
  additionalDescription: { 
    type: String, 
    required: false // Optional additional description
  }, 
  preferredColors: [{ 
    type: String 
  }], // Changed to an array to store multiple colors
  designImage: { 
    type: String, 
    required: false // Optional design
  }
}, 
{ timestamps: true });

module.exports = mongoose.model('Customization', customizationSchema);

