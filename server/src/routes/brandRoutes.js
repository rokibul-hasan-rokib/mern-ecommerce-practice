import express from 'express';
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandDetails,
  getBrandsWithCount
} from '../controllers/brandController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/brands').get(getAllBrands);
router.route('/brand/:id').get(getBrandDetails);
router.route('/brands/stats').get(getBrandsWithCount);

// Admin only routes
router.route('/admin/brands/new').post(isAuthenticatedUser, authorizeRoles('admin'), createBrand);
router.route('/admin/brand/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateBrand)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBrand);

export default router;
