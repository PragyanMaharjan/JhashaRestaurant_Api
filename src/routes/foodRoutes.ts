const express = require('express');
const { getAllFood, getFoodById, addFood, updateFood, deleteFood } = require('../controllers/foodController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getAllFood);
router.get('/:id', getFoodById);
router.post('/', verifyToken, verifyAdmin, upload.single('image'), addFood);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), updateFood);
router.delete('/:id', verifyToken, verifyAdmin, deleteFood);

module.exports = router;

export {};
