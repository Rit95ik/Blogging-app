import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const CATEGORIES = [
  'All',
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Business',
  'Education',
  'Entertainment',
  'Sports',
  'Other',
];

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaSearch />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== 'All') && (
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
              Search: {searchTerm}
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
              Category: {selectedCategory}
            </span>
          )}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              onSearch('');
              onFilter('All');
            }}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
