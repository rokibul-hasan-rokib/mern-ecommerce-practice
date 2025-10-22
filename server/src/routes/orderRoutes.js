import express from 'express';
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// User routes
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// Admin routes
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;
