const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(\+254|0)?[7][0-9]{8}$/.test(v); // Kenyan phone number format
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  profilePhoto: { type: String, default: null },
  birthday: { type: Date, required: false },
  address: { type: String, required: false },
  preferredCakeFlavors: [String],
  password: { type: String, required: true },
  accountCreationDate: { type: Date, default: Date.now },
});


userSchema.pre('save', async function(next) {
  next();
});

// Virtual field for confirmPassword to be used during validation, but not saved in the database
userSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword;
  })
  .set(function(value) {
    this._confirmPassword = value;
  });

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;

