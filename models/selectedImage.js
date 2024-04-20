const mongoose = require('mongoose');

const selectedImageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true // or false, depending on your requirements
    }
});

const SelectedImage = mongoose.model('SelectedImage', selectedImageSchema);

module.exports = SelectedImage;
