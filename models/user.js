const mongoose = require('mongoose');

const model = mongoose.model('User', {
  email: {
    type: String,
    required: true,
  }
});

module.exports = model;
