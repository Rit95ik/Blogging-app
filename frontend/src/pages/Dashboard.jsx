import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { blogService } from '../services/blogService';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { FaPlus, FaBlog, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-blogs');

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getBlogs({ author: userInfo._id });
      setMyBlogs(data.blogs);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        setMyBlogs(myBlogs.filter((blog) => blog._id !== id));
        toast.success('Blog deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {userInfo?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your blogs and track your performance
              </p>
            </div>
            <Link
              to="/create-blog"
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <FaPlus />
              <span>Create New Blog</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {myBlogs.length}
                </p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <FaBlog className="text-primary-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {myBlogs.reduce((acc, blog) => acc + (blog.views || 0), 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEdit className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Likes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {myBlogs.reduce(
                    (acc, blog) => acc + (blog.likes?.length || 0),
                    0
                  )}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaTrash className="text-red-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('my-blogs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'my-blogs'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Blogs ({myBlogs.length})
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="py-20">
                <Loader size="large" />
              </div>
            ) : myBlogs.length === 0 ? (
              <div className="text-center py-20">
                <FaBlog className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No blogs yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start sharing your thoughts with the world!
                </p>
                <Link
                  to="/create-blog"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <FaPlus />
                  <span>Create Your First Blog</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBlogs.map((blog) => (
                  <div key={blog._id} className="relative">
                    <BlogCard blog={blog} />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow-lg"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
