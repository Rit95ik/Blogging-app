import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  total: 0,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.total = action.payload.total;
      state.loading = false;
      state.error = null;
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    addBlog: (state, action) => {
      state.blogs.unshift(action.payload);
      state.total += 1;
    },
    updateBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
      if (state.currentBlog?._id === action.payload._id) {
        state.currentBlog = action.payload;
      }
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      state.total -= 1;
    },
  },
});

export const {
  setBlogs,
  setCurrentBlog,
  clearCurrentBlog,
  setLoading,
  setError,
  clearError,
  addBlog,
  updateBlog,
  removeBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
