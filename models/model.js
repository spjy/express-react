const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  key: {
    type: String,
  },
});

schema.pre('save', async (next) => {
  this.updated = Date.now();

  next();
});

module.exports = mongoose.model('model', schema);
