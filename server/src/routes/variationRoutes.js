import express from 'express';
import {
  getAllVariations,
  createVariation,
  updateVariation,
  deleteVariation,
  getVariationDetails,
  getVariationsByProduct,
  getVariationByAttributes,
  getVariationsStats
} from '../controllers/variationController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/variations').get(getAllVariations);
router.route('/variation/:id').get(getVariationDetails);
router.route('/variations/product/:productId').get(getVariationsByProduct);
router.route('/variations/product/:productId/attributes/:attributes').get(getVariationByAttributes);
router.route('/variations/stats').get(getVariationsStats);

// Admin only routes
router.route('/admin/variations/new').post(isAuthenticatedUser, authorizeRoles('admin'), createVariation);
router.route('/admin/variation/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateVariation)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteVariation);

export default router;
