const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
