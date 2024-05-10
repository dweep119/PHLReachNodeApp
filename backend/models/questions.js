var mongoose = require('mongoose');

var questionsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  type: String,
  groupId: Number,
  default: String,
  choice: Array,
  isRequired: {type: Boolean, default: false},
  errorMessage: String
});

module.exports = mongoose.model('questions', questionsSchema);