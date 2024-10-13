const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Full name of the user
    email: { type: String, required: true, unique: true },  // Email address, unique for each user
    phoneNumber: { type: String, required: true },  // Phone number of the user
    password: { type: String, required: true },  // Hashed password
    confirmPassword: { type: String },  // Placeholder, not saved in DB (used for validation only)
    birthday: { type: Date },  // User's birthday
    address: { type: String },  // User's address
    preferredCakeFlavors: [{ type: String }],  // List of user's preferred cake flavors
    profilePicture: { type: String },  // Path or URL to the profile photo
    date: { type: Date, default: Date.now },  // Account creation date
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

