// controllers/uploadController.js

const SelectedImage = require('../models/selectedImage');

// Controller function to handle image upload
exports.uploadImages = async (req, res) => {
  const { selectedMediaData } = req.body;
  console.log('Selected Images:', selectedMediaData);
  
  try {
    // Save selected images to the database
    const savedImages = await SelectedImage.insertMany(selectedMediaData.map(image => ({ id: image.id, url: image.url })));
    
    // Respond with success message
    res.json({ message: 'Images uploaded successfully', savedImages});
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

// Controller function to get selected images
exports.getSelectedImages = async (req, res) => {
  try {
    // Retrieve selected images from the database
    const selectedImages = await SelectedImage.find();
    
    // Respond with currently selected images
    res.json({ selectedImages });
  } catch (error) {
    console.error('Error retrieving selected images:', error);
    res.status(500).json({ error: 'Failed to retrieve selected images' });
  }
};
