const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  vaccinationStatus: { type: Boolean, default: false },
  vaccinationDetails: [
    {
      vaccineName: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);