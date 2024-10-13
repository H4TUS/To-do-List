const mongoose = require('mongoose');

const Task = mongoose.model('Tasks', {
  description: String,
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
