# Blogging Platform - Full Stack MERN Application

A modern, feature-rich blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, read, update, and delete blog posts with rich text editing, image uploads, comments, likes, and more.

## 🚀 Features

### User Features
- **Authentication**: Secure JWT-based authentication system
- **Rich Text Editor**: Create beautiful blog posts with React-Quill
- **Image Uploads**: Upload cover images using Cloudinary
- **Blog Management**: Create, edit, delete, and view blog posts
- **Social Features**: Like and comment on blog posts
- **Search & Filter**: Find blogs by title, content, or category
- **Profile Management**: Update profile information and avatar
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Admin Features
- **Admin Dashboard**: Comprehensive analytics and overview
- **User Management**: View, activate/deactivate, and delete users
- **Blog Management**: View and delete any blog post
- **Statistics**: Track total users, blogs, views, and likes
- **Top Authors**: View top-performing authors

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Blogging app(zidio)"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogging-platform
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note**: Get your Cloudinary credentials from [Cloudinary](https://cloudinary.com/)

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## 📦 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File upload handling

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React-Quill** - Rich text editor
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **DOMPurify** - HTML sanitization

## 📁 Project Structure

```
Blogging app(zidio)/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── BlogCard.jsx
    │   │   ├── SearchFilter.jsx
    │   │   ├── Loader.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── BlogView.jsx
    │   │   ├── CreateBlog.jsx
    │   │   ├── EditBlog.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Profile.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── NotFound.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── blogService.js
    │   │   └── adminService.js
    │   ├── store/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js
    │   │   │   ├── blogSlice.js
    │   │   │   └── adminSlice.js
    │   │   └── store.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Blogs
- `GET /api/blogs` - Get all blogs (with search and filter)
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (Protected)
- `PUT /api/blogs/:id` - Update blog (Protected)
- `DELETE /api/blogs/:id` - Delete blog (Protected)
- `POST /api/blogs/:id/comments` - Add comment (Protected)
- `POST /api/blogs/:id/likes` - Toggle like (Protected)
- `POST /api/blogs/upload` - Upload image (Protected)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)
- `PUT /api/admin/users/:id/toggle-active` - Toggle user status (Admin)
- `GET /api/admin/blogs` - Get all blogs (Admin)
- `DELETE /api/admin/blogs/:id` - Delete blog (Admin)

## 👤 Default Accounts

### Admin Account
- Email: admin@example.com
- Password: admin123

### User Account
- Email: user@example.com
- Password: user123

**Note**: You'll need to create these accounts manually or via the registration page. Then update the user document in MongoDB to set `isAdmin: true` for admin privileges.

## 🎨 Features Breakdown

### Rich Text Editor
- Multiple heading levels
- Text formatting (bold, italic, underline, strikethrough)
- Lists (ordered and unordered)
- Links, images, and videos
- Code blocks and blockquotes
- Text alignment and colors

### Blog Categories
- Technology
- Lifestyle
- Travel
- Food
- Health
- Business
- Education
- Entertainment
- Sports
- Other

## 🔒 Security Features
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- XSS protection with DOMPurify
- CORS enabled

## 📱 Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Developed as part of the Zidio Development internship program.

## 🙏 Acknowledgments
- MongoDB for the database
- Cloudinary for image hosting
- React and the React community
- Express.js team
- All open-source contributors
