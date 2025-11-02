import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Blog from '../models/Blog.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle-active
// @access  Private/Admin
const toggleUserActive = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot deactivate admin user');
    }

    user.isActive = !user.isActive;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all blogs (including drafts)
// @route   GET /api/admin/blogs
// @access  Private/Admin
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .populate('author', 'name email')
    .sort({ createdAt: -1 });

  res.json(blogs);
});

// @desc    Delete any blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const totalBlogs = await Blog.countDocuments({});
  const publishedBlogs = await Blog.countDocuments({ status: 'published' });
  const draftBlogs = await Blog.countDocuments({ status: 'draft' });
  const activeUsers = await User.countDocuments({ isActive: true });
  const inactiveUsers = await User.countDocuments({ isActive: false });

  // Get recent blogs
  const recentBlogs = await Blog.find({})
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  // Get top authors
  const topAuthors = await Blog.aggregate([
    {
      $group: {
        _id: '$author',
        blogCount: { $sum: 1 },
        totalViews: { $sum: '$views' },
        totalLikes: { $sum: { $size: '$likes' } },
      },
    },
    { $sort: { blogCount: -1 } },
    { $limit: 5 },
  ]);

  // Populate author details
  await User.populate(topAuthors, { path: '_id', select: 'name email avatar' });

  res.json({
    totalUsers,
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    activeUsers,
    inactiveUsers,
    recentBlogs,
    topAuthors,
  });
});

export {
  getAllUsers,
  deleteUser,
  toggleUserActive,
  getAllBlogs,
  deleteBlog,
  getDashboardStats,
};
