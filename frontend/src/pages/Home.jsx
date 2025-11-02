import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { blogService } from '../services/blogService';
import { setBlogs, setLoading } from '../store/slices/blogSlice';
import BlogCard from '../components/BlogCard';
import SearchFilter from '../components/SearchFilter';
import Loader from '../components/Loader';
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);
  const { userInfo } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
  });

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      dispatch(setLoading(true));
      const data = await blogService.getBlogs(filters);
      dispatch(setBlogs(data));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const handleFilter = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: category === 'All' ? '' : category,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BlogHub</h1>
          <p className="text-xl mb-8">
            Discover amazing stories, insights, and ideas from writers around
            the world
          </p>
          {userInfo ? (
            <Link
              to="/create-blog"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <FaRocket />
              <span>Start Writing</span>
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <FaRocket />
              <span>Get Started</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-20">
            <Loader size="large" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No blogs found. {userInfo && 'Be the first to create one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
