const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: { type: String, required: true },
  preferredCakeFlavors: [String],
  profilePicture: String,
  accountCreationDate: { type: Date, default: Date.now },
});

// Password hashing before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

