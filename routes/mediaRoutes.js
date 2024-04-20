
const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/media');
const uploadController = require('../controllers/uploadController');

// Route for handling image upload
router.post('/upload', uploadController.uploadImages);
router.get('/getSelectedImages', uploadController.getSelectedImages);

router.get('/media', instagramController.fetchAndSaveInstagramMedia);



module.exports = router;
