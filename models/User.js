const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
  uuid: { type: String, default: uuidv4 },
  firstName: String,
  lastName: String,
  email: String,
  state: String,
  city: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false},
  password: String,
  profile_img: String,
  address: String,
  phone: Number,
  history: Array,
  documents: Array,
  country: String,
  bio: String,
  last_logged_in: String,
});

// compile our model
const User = mongoose.model('User', userSchema);
module.exports = User;