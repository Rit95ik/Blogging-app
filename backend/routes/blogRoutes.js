import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  toggleLike,
  uploadImage,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.post('/upload', protect, uploadImage);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);
router.post('/:id/comments', protect, addComment);
router.post('/:id/likes', protect, toggleLike);

export default router;
