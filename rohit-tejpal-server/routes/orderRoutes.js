import express from 'express';
import { addOrderItems, getMyOrders, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, updateOrderStatus);

export default router;
