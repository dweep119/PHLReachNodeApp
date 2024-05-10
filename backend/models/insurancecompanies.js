var mongoose = require('mongoose');

var insurancecompaniesSchema = new mongoose.Schema({
    label: String,
    value: String
});

module.exports = mongoose.model('insurancecompanies', insurancecompaniesSchema);