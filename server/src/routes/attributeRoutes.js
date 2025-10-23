import express from 'express';
import {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributeDetails,
  getAttributesWithCount
} from '../controllers/attributeController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/attributes').get(getAllAttributes);
router.route('/attribute/:id').get(getAttributeDetails);
router.route('/attributes/stats').get(getAttributesWithCount);

// Admin only routes
router.route('/admin/attributes/new').post(isAuthenticatedUser, authorizeRoles('admin'), createAttribute);
router.route('/admin/attribute/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateAttribute)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAttribute);

export default router;
