const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getMyOrders, getOrders, updateOrderStatus, getDashboardStats } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/myorders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
