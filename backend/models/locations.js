var mongoose = require('mongoose');

var locationsSchema = new mongoose.Schema({
  locationName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String,
  website: String
});

module.exports = mongoose.model('locations', locationsSchema);