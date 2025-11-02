import express from 'express';
import {
  getAllUsers,
  deleteUser,
  toggleUserActive,
  getAllBlogs,
  deleteBlog,
  getDashboardStats,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and require admin access
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.route('/users').get(getAllUsers);
router.route('/users/:id').delete(deleteUser);
router.put('/users/:id/toggle-active', toggleUserActive);
router.route('/blogs').get(getAllBlogs);
router.route('/blogs/:id').delete(deleteBlog);

export default router;
