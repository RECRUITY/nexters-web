const mongoose = require('mongoose');

const FileScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileId: String,
  image: Boolean,
  thumb: {
    fileId: String,
  },
});

const File = mongoose.model('File', FileScheme);

module.exports = File;
