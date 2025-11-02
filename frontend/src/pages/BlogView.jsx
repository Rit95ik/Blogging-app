import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { blogService } from '../services/blogService';
import Loader from '../components/Loader';
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaEye,
  FaCalendar,
  FaUser,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogService.getBlog(id);
      setBlog(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch blog');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!userInfo) {
      toast.error('Please login to like blogs');
      navigate('/login');
      return;
    }

    try {
      const data = await blogService.toggleLike(id);
      setBlog(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to toggle like');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      const data = await blogService.addComment(id, comment);
      setBlog(data);
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        toast.success('Blog deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!blog) return null;

  const isLiked = blog.likes?.includes(userInfo?._id);
  const isAuthor = userInfo?._id === blog.author?._id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            {/* Category & Actions */}
            <div className="flex justify-between items-center mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
                {blog.category}
              </span>

              {isAuthor && (
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-blog/${blog._id}`}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-700 font-medium">
                    {blog.author?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendar className="text-gray-400" />
                  <span className="text-gray-600">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaEye className="text-gray-400" />
                  <span>{blog.views} views</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="blog-content prose max-w-none mb-8"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />

            {/* Like & Comment Stats */}
            <div className="flex items-center space-x-6 mb-6 pb-6 border-b">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-600'
                } hover:text-red-500 transition`}
              >
                {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                <span className="font-medium">{blog.likes?.length || 0}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaComment size={20} />
                <span className="font-medium">
                  {blog.comments?.length || 0}
                </span>
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Comments ({blog.comments?.length || 0})
              </h2>

              {/* Add Comment */}
              {userInfo ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              ) : (
                <p className="text-gray-600 mb-6">
                  <Link to="/login" className="text-primary-600 hover:underline">
                    Login
                  </Link>{' '}
                  to leave a comment
                </p>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {blog.comments?.length > 0 ? (
                  blog.comments.map((c, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <FaUser className="text-gray-400" />
                        <span className="font-medium text-gray-800">
                          {c.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{c.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
