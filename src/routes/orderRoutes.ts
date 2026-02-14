const express = require('express');
const { createOrder, getUserOrders, getOrderById, createPaymentIntent, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getUserOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/payment/create-intent', verifyToken, createPaymentIntent);
router.put('/:id/status', verifyToken, verifyAdmin, updateOrderStatus);
router.put('/:id/cancel', verifyToken, cancelOrder);

module.exports = router;

export {};
