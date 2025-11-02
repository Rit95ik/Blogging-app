import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../services/adminService';
import Loader from '../components/Loader';
import {
  FaUsers,
  FaBlog,
  FaChartLine,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaHeart,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, blogsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllUsers(),
        adminService.getAllBlogs(),
      ]);
      setStats(statsData);
      setUsers(usersData);
      setBlogs(blogsData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleUserActive = async (id) => {
    try {
      const data = await adminService.toggleUserActive(id);
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isActive: data.isActive } : user
        )
      );
      toast.success('User status updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await adminService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success('Blog deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats?.totalUsers || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Active: {stats?.activeUsers || 0} | Inactive:{' '}
                  {stats?.inactiveUsers || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats?.totalBlogs || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Published: {stats?.publishedBlogs || 0} | Drafts:{' '}
                  {stats?.draftBlogs || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaBlog className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {blogs.reduce((acc, blog) => acc + (blog.views || 0), 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaEye className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Likes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {blogs.reduce(
                    (acc, blog) => acc + (blog.likes?.length || 0),
                    0
                  )}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaHeart className="text-red-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaChartLine className="inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'users'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaUsers className="inline mr-2" />
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'blogs'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaBlog className="inline mr-2" />
                Blogs ({blogs.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Recent Blogs
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Views
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Likes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats?.recentBlogs?.slice(0, 5).map((blog) => (
                          <tr key={blog._id}>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {blog.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {blog.author?.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {blog.views || 0}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {blog.likes?.length || 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Top Authors
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Blogs
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Total Views
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Total Likes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats?.topAuthors?.map((author) => (
                          <tr key={author._id._id}>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {author._id.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {author.blogCount}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {author.totalViews}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {author.totalLikes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.isAdmin ? 'Admin' : 'User'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            {!user.isAdmin && (
                              <>
                                <button
                                  onClick={() => handleToggleUserActive(user._id)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title={
                                    user.isActive ? 'Deactivate' : 'Activate'
                                  }
                                >
                                  {user.isActive ? (
                                    <FaToggleOn size={20} />
                                  ) : (
                                    <FaToggleOff size={20} />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Delete"
                                >
                                  <FaTrash />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Blogs Tab */}
            {activeTab === 'blogs' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {blog.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {blog.author?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {blog.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              blog.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {blog.views || 0}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
