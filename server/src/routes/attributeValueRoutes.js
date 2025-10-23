import express from 'express';
import {
  getAllAttributeValues,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
  getAttributeValueDetails,
  getValuesByAttribute
} from '../controllers/attributeValueController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/attribute-values').get(getAllAttributeValues);
router.route('/attribute-value/:id').get(getAttributeValueDetails);
router.route('/attribute-values/:attribute').get(getValuesByAttribute);

// Admin only routes
router.route('/admin/attribute-values/new').post(isAuthenticatedUser, authorizeRoles('admin'), createAttributeValue);
router.route('/admin/attribute-value/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateAttributeValue)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAttributeValue);

export default router;
