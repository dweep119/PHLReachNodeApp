var mongoose = require('mongoose');

var slotsSchema = new mongoose.Schema({
    slot: String
});

module.exports = mongoose.model('slots', slotsSchema);