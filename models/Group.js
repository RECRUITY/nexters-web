const mongoose = require('mongoose');

const GroupScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
});

const Group = mongoose.model('Group', GroupScheme);

module.exports = Group;
