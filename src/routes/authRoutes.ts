const express = require('express');
const { register, login, forgotPassword, resetPassword, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, upload.single('profileImage'), updateUserProfile);

module.exports = router;

export {};
