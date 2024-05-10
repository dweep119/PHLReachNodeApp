var mongoose = require('mongoose');

var groupsSchema = new mongoose.Schema({
    id: Number,
    label: String
});

module.exports = mongoose.model('groups', groupsSchema);