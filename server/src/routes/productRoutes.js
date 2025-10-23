import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getProductsByCategory,
  getProductsByBrand,
  getProductsStats
} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/products/brand/:brand').get(getProductsByBrand);
router.route('/products/stats').get(getProductsStats);

// Review routes (require authentication)
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);

// Admin only routes
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

export default router;
