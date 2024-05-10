var mongoose = require('mongoose');

var neweventsSchema = new mongoose.Schema({
  assignedLocationId: String,
  eventDate: String,
  startTime: String,
  endTime: String,
  patientsPerBlock: Number,
  blocksPerHour: Number
});

module.exports = mongoose.model('newevents', neweventsSchema);