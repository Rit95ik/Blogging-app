import api from '../utils/api';

export const blogService = {
  // Get all blogs
  getBlogs: async (params = {}) => {
    const response = await api.get('/api/blogs', { params });
    return response.data;
  },

  // Get single blog
  getBlog: async (id) => {
    const response = await api.get(`/api/blogs/${id}`);
    return response.data;
  },

  // Create blog
  createBlog: async (blogData) => {
    const response = await api.post('/api/blogs', blogData);
    return response.data;
  },

  // Update blog
  updateBlog: async (id, blogData) => {
    const response = await api.put(`/api/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id) => {
    const response = await api.delete(`/api/blogs/${id}`);
    return response.data;
  },

  // Add comment
  addComment: async (id, comment) => {
    const response = await api.post(`/api/blogs/${id}/comments`, { comment });
    return response.data;
  },

  // Toggle like
  toggleLike: async (id) => {
    const response = await api.post(`/api/blogs/${id}/likes`);
    return response.data;
  },

  // Upload image
  uploadImage: async (imageData) => {
    const response = await api.post('/api/blogs/upload', { image: imageData });
    return response.data;
  },
};
