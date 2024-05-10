var mongoose = require('mongoose');

var relationshipsSchema = new mongoose.Schema({
    label: String,
    value: String
});

module.exports = mongoose.model('relationships', relationshipsSchema);