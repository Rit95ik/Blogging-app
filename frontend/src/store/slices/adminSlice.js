import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  blogs: [],
  stats: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const {
  setUsers,
  setBlogs,
  setStats,
  setLoading,
  setError,
  removeUser,
  removeBlog,
  updateUser,
} = adminSlice.actions;

export default adminSlice.reducer;
