const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  qualification: { type: String, required: true },
  availableTime: { type: String, required: true },
  modeOfCommunication: { type: String,enum :['video call','phone call','text chat'], required: true },
  mentorshipDuration: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);
