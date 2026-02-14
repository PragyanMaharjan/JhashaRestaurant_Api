const express = require('express');
const { getAllUsers, getUserDetails, updateUserStatus, updateUser, deleteUser, getDashboardStats } = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.get('/users/:id', verifyToken, verifyAdmin, getUserDetails);
router.put('/users/status', verifyToken, verifyAdmin, updateUserStatus);
router.put('/users/:id', verifyToken, verifyAdmin, upload.single('profileImage'), updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);
router.get('/stats', verifyToken, verifyAdmin, getDashboardStats);

module.exports = router;

export {};
