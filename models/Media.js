const mongoose = require('mongoose');

const instagramMediaSchema = new mongoose.Schema({
  id: String,
  media_type: String,
  media_url: String,
  thumbnail_url: String,
  permalink: String,
  timestamp: String,
});

const InstagramMedia = mongoose.model('InstagramMedia', instagramMediaSchema);

module.exports = InstagramMedia;
