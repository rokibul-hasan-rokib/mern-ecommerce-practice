import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
  getCategoriesWithCount
} from '../controllers/categoryController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/categories').get(getAllCategories);
router.route('/category/:id').get(getCategoryDetails);
router.route('/categories/stats').get(getCategoriesWithCount);

// Admin only routes
router.route('/admin/categories/new').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);
router.route('/admin/category/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

export default router;
