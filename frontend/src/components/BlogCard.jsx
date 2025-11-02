import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaEye, FaCalendar, FaUser } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const BlogCard = ({ blog }) => {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getExcerpt = (content, length = 150) => {
    const text = stripHtml(content);
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Cover Image */}
      {blog.coverImage && (
        <Link to={`/blogs/${blog._id}`}>
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover hover:opacity-90 transition"
          />
        </Link>
      )}

      <div className="p-6">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full mb-3">
          {blog.category}
        </span>

        {/* Title */}
        <Link to={`/blogs/${blog._id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary-600 transition line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.excerpt || getExcerpt(blog.content)}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-400" />
            <span>{blog.author?.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendar className="text-gray-400" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaHeart className="text-red-500" />
              <span>{blog.likes?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaComment className="text-blue-500" />
              <span>{blog.comments?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEye className="text-gray-400" />
              <span>{blog.views || 0}</span>
            </div>
          </div>
          <Link
            to={`/blogs/${blog._id}`}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
