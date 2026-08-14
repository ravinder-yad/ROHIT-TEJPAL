import express from 'express';
import { addOrderItems, getMyOrders, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, adminAuth, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, adminAuth, updateOrderStatus);

export default router;
