import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all blogs with filtering and search
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const { search, category, author } = req.query;

  let query = { status: 'published' };

  // Search by title or content
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter by category
  if (category && category !== 'All') {
    query.category = category;
  }

  // Filter by author
  if (author) {
    query.author = author;
  }

  const count = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .populate('author', 'name email avatar')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    blogs,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('author', 'name email avatar bio')
    .populate('comments.user', 'name avatar');

  if (blog) {
    // Increment view count
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, coverImage, category, tags, status } = req.body;

  const blog = await Blog.create({
    author: req.user._id,
    title,
    content,
    excerpt,
    coverImage,
    category,
    tags: tags || [],
    status: status || 'published',
  });

  const createdBlog = await Blog.findById(blog._id).populate('author', 'name email avatar');

  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, coverImage, category, tags, status } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this blog');
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.coverImage = coverImage || blog.coverImage;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.status = status || blog.status;

    const updatedBlog = await blog.save();
    const populatedBlog = await Blog.findById(updatedBlog._id).populate('author', 'name email avatar');

    res.json(populatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this blog');
    }

    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Add a comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const newComment = {
      user: req.user._id,
      name: req.user.name,
      comment,
    };

    blog.comments.push(newComment);
    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email avatar')
      .populate('comments.user', 'name avatar');

    res.status(201).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Toggle like on blog
// @route   POST /api/blogs/:id/likes
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const alreadyLiked = blog.likes.find(
      (like) => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Unlike
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      blog.likes.push(req.user._id);
    }

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name email avatar')
      .populate('comments.user', 'name avatar');

    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Upload image to Cloudinary
// @route   POST /api/blogs/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.body.image) {
    res.status(400);
    throw new Error('No image data provided');
  }

  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'blog-images',
      resource_type: 'auto',
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Image upload failed');
  }
});

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  toggleLike,
  uploadImage,
};
