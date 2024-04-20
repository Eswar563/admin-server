const axios = require('axios');
const cron = require('node-cron');
const Media = require('../models/Media.js');
// const sendEmail = require('../emailService.js')

async function fetchAndSaveInstagramMedia(req, res) {
  try {
    const instagramApiEndpoint = 'https://graph.instagram.com/v12.0/me/media';
    const accessToken = 'IGQWRNWjdSendTZAUpQZAHI1MHdGcG1xZADhZAWVpRVUZAaNHhPQlFyZAEhsX205TlR6eTZAWaWtIaDlKYzRORUY3S1JXeWJ5MTZA3SGMwQVJIcUFsYkxmVElpR0xGWHhOREFmN29aNlpXNUJrSk5NMkstYl9SMEQ1OV9HNGMZD';

    const response = await axios.get(`${instagramApiEndpoint}?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`);
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      console.log('No Instagram media found in the response');
      return res.json({ success: true, message: 'No Instagram media found in the response', data: [] });
    }
    
    const mediaData = response.data.data;
    let newMediaCount = 0;

    for (const data of mediaData) {
     // Check if the data already exists in the database by its unique identifier (for example, 'id')
     const existingMedia = await Media.findOne({ id: data.id });

     if (!existingMedia) {
       const instagramMedia = new Media(data);
       await instagramMedia.save();
       newMediaCount++;
     }
    }

    if (newMediaCount === 0) {
      console.log('No new Instagram media fetched');
      const savedMedia = await Media.find(); 
      return res.json({ success: true, message: 'No new Instagram media fetched', data: savedMedia });
    } else {
      console.log(`${newMediaCount} new Instagram media fetched and saved to MongoDB`);
      const savedMedia = await Media.find(); // Retrieve all saved media from the database
      return res.json({ success: true, message: `${newMediaCount} new Instagram media fetched and saved to MongoDB`, data: savedMedia });
    }
  } catch (error) {
    console.error('Error fetching Instagram media:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


cron.schedule('0 0 * * 6', async () => {
  console.log('Running cron job to fetch Instagram media');
  await fetchAndSaveInstagramMedia();
});


module.exports = {
  fetchAndSaveInstagramMedia,
};
