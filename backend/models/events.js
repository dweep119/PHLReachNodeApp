var mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
    key: String,
    value: String
});

module.exports = mongoose.model('events', eventsSchema);