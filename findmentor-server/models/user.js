const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['mentor', 'mentee'], required: true }, // Ensure role is limited to mentor or mentee
    isVerified: { type: Boolean, default: false },
});

const user = mongoose.model('user', userSchema);
module.exports = user;
