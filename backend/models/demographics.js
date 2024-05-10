var mongoose = require('mongoose');

var demographicsSchema = new mongoose.Schema({
    race: Array,
    gender: Array,
    ethnicity: Array,
    preferredLanguage: Array
});

module.exports = mongoose.model('demographics', demographicsSchema);