const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake' },
  flavor: String,
  customFlavor: String, enum ['price:1500']
  sizeInKgs: Number,
  icingType: { type: String, enum: ['Hard icing', 'Soft icing', 'Fresh cream'] },
  shape: { type: String, enum: ['Square', 'Round', 'Stacked', 'HeartShape'] },
  celebrationExtras: String, enum: ['Sprinkles: 300', 'Flowers: 400', 'Candles: 250', 'Edible Glitter: 600']
  message: String,
  additionalDescription: String,
  preferredColors: [String],
  designImage: String,
});

const Customization = mongoose.model('Customization', customizationSchema);
module.exports = Customization;

