const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const middleWare = require('../middlewares/index.js')

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', middleWare.authenticateToken, authController.profile)
router.put('/editProfile/:userId/', middleWare.authenticateToken, authController.editProfile)

module.exports = router;