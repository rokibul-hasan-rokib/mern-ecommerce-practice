import express from 'express';
import {
  register,
  login,
  logout,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser
} from '../controllers/userController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

// Protected routes
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// Admin only routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
