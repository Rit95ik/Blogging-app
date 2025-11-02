import api from '../utils/api';

export const adminService = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/api/admin/users/${id}`);
    return response.data;
  },

  // Toggle user active status
  toggleUserActive: async (id) => {
    const response = await api.put(`/api/admin/users/${id}/toggle-active`);
    return response.data;
  },

  // Get all blogs
  getAllBlogs: async () => {
    const response = await api.get('/api/admin/blogs');
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id) => {
    const response = await api.delete(`/api/admin/blogs/${id}`);
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },
};
