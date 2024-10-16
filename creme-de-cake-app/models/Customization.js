const customizationSchema = new mongoose.Schema({
  cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake' },
  flavor: String,  // Standard flavor
  customFlavor: { type: String, enum: ['Custom flavor:1500'] },  // Custom flavor with specific price
  sizeInKgs: Number,
  icingType: { type: String, enum: ['Hard icing', 'Soft icing', 'Fresh cream'] },
  shape: { type: String, enum: ['Square', 'Round', 'Stacked', 'HeartShape'] },
  celebrationExtras: [{ type: String, enum: ['Sprinkles:300', 'Flowers:400', 'Candles:250', 'Edible Glitter:600'] }],  // Array to hold multiple extras
  message: String,
  additionalDescription: String,
  preferredColors: [String],
  designImage: String,
});

