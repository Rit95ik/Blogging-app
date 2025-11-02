# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    React Frontend                         │  │
│  │                   (http://localhost:3000)                 │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   Pages     │  │ Components  │  │   Services  │      │  │
│  │  │  (10 pages) │  │  (15+ comp) │  │  (API calls)│      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │       Redux Store (State Management)            │    │  │
│  │  │  - authSlice  - blogSlice  - adminSlice         │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  │                                                           │  │
│  │  Technologies: React, Redux, React Router, Tailwind      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS (Axios)
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Express.js Backend                        │  │
│  │                (http://localhost:5000)                    │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   Routes    │  │ Controllers │  │ Middleware  │      │  │
│  │  │  (3 routes) │  │ (3 control) │  │ (Auth/Error)│      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │           JWT Authentication Layer              │    │  │
│  │  │    - Token Generation  - Token Verification     │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  │                                                           │  │
│  │  Technologies: Node.js, Express, JWT, Bcrypt             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                    ↕ Mongoose ODM                   ↕ REST API
┌─────────────────────────────┐        ┌─────────────────────────┐
│     DATABASE LAYER          │        │    EXTERNAL SERVICES    │
│                             │        │                         │
│  ┌───────────────────────┐  │        │  ┌──────────────────┐  │
│  │   MongoDB Database    │  │        │  │   Cloudinary CDN │  │
│  │                       │  │        │  │                  │  │
│  │  ┌────────────────┐   │  │        │  │  ┌────────────┐ │  │
│  │  │ users          │   │  │        │  │  │   Images   │ │  │
│  │  │ - auth info    │   │  │        │  │  │  Storage   │ │  │
│  │  │ - profile data │   │  │        │  │  └────────────┘ │  │
│  │  └────────────────┘   │  │        │  │                  │  │
│  │                       │  │        │  │  - Blog covers   │  │
│  │  ┌────────────────┐   │  │        │  │  - User avatars  │  │
│  │  │ blogs          │   │  │        │  │                  │  │
│  │  │ - blog posts   │   │  │        │  └──────────────────┘  │
│  │  │ - comments     │   │  │        └─────────────────────────┘
│  │  │ - likes        │   │  │
│  │  └────────────────┘   │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  MongoDB (Local or Atlas)   │
└─────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Registration Flow

```
User (Browser)
    │
    │ 1. Enters name, email, password
    ↓
Registration Form (React)
    │
    │ 2. Validates input
    ↓
authService.register()
    │
    │ 3. POST /api/auth/register
    ↓
Express Server
    │
    │ 4. Validates request
    ↓
authController.registerUser()
    │
    │ 5. Checks if user exists
    ↓
User Model
    │
    │ 6. Hash password (bcrypt)
    │ 7. Create user document
    ↓
MongoDB
    │
    │ 8. Save user
    ↓
Generate JWT Token
    │
    │ 9. Return user data + token
    ↓
Redux Store (setCredentials)
    │
    │ 10. Store in localStorage
    │ 11. Update app state
    ↓
Redirect to Dashboard
```

### 2. Create Blog Post Flow

```
User (Authenticated)
    │
    │ 1. Writes blog content
    ↓
Rich Text Editor (React-Quill)
    │
    │ 2. Uploads cover image
    ↓
blogService.uploadImage()
    │
    │ 3. POST /api/blogs/upload (with JWT)
    ↓
Express Server (auth middleware)
    │
    │ 4. Verify JWT token
    ↓
blogController.uploadImage()
    │
    │ 5. Upload to Cloudinary
    ↓
Cloudinary API
    │
    │ 6. Return image URL
    ↓
Create Blog Form
    │
    │ 7. Submit blog data
    ↓
blogService.createBlog()
    │
    │ 8. POST /api/blogs (with JWT)
    ↓
Express Server (auth middleware)
    │
    │ 9. Verify JWT token
    ↓
blogController.createBlog()
    │
    │ 10. Validate blog data
    ↓
Blog Model
    │
    │ 11. Create blog document
    ↓
MongoDB
    │
    │ 12. Save blog
    ↓
Redux Store (addBlog)
    │
    │ 13. Update app state
    ↓
Redirect to Blog View or Dashboard
```

### 3. Blog View with Like/Comment Flow

```
User Views Blog
    │
    │ 1. GET /api/blogs/:id
    ↓
blogController.getBlogById()
    │
    │ 2. Find blog + populate author
    │ 3. Increment view count
    ↓
MongoDB
    │
    │ 4. Return blog data
    ↓
Blog View Page
    │
    │ 5. Display blog content
    │
    ├──→ User Clicks Like
    │       │
    │       │ POST /api/blogs/:id/likes
    │       ↓
    │   blogController.toggleLike()
    │       │
    │       │ Add/Remove user ID from likes array
    │       ↓
    │   MongoDB (update)
    │       │
    │       ↓
    │   Updated Blog Data
    │
    └──→ User Adds Comment
            │
            │ POST /api/blogs/:id/comments
            ↓
        blogController.addComment()
            │
            │ Add comment to comments array
            ↓
        MongoDB (update)
            │
            ↓
        Updated Blog Data
```

---

## API Architecture

### RESTful Endpoints Structure

```
/api
├── /auth
│   ├── POST   /register          → Register new user
│   ├── POST   /login             → Login user
│   ├── GET    /profile           → Get user profile (Protected)
│   └── PUT    /profile           → Update user profile (Protected)
│
├── /blogs
│   ├── GET    /                  → Get all blogs (with filters)
│   ├── GET    /:id               → Get single blog
│   ├── POST   /                  → Create blog (Protected)
│   ├── PUT    /:id               → Update blog (Protected)
│   ├── DELETE /:id               → Delete blog (Protected)
│   ├── POST   /:id/comments      → Add comment (Protected)
│   ├── POST   /:id/likes         → Toggle like (Protected)
│   └── POST   /upload            → Upload image (Protected)
│
└── /admin (All routes require Admin)
    ├── GET    /stats             → Get dashboard stats
    ├── GET    /users             → Get all users
    ├── DELETE /users/:id         → Delete user
    ├── PUT    /users/:id/toggle  → Toggle user status
    ├── GET    /blogs             → Get all blogs
    └── DELETE /blogs/:id         → Delete any blog
```

---

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, trim),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min: 6),
  bio: String (max: 500),
  avatar: String (URL),
  isAdmin: Boolean (default: false),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model

```javascript
{
  _id: ObjectId,
  author: ObjectId (ref: 'User', required),
  title: String (required, trim, max: 200),
  content: String (required, HTML),
  excerpt: String (max: 300),
  coverImage: String (URL),
  category: String (enum: 10 categories),
  tags: [String],
  likes: [ObjectId] (ref: 'User'),
  comments: [{
    _id: ObjectId,
    user: ObjectId (ref: 'User'),
    name: String,
    comment: String,
    createdAt: Date
  }],
  views: Number (default: 0),
  status: String (enum: ['draft', 'published']),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Component Hierarchy

### Frontend Component Tree

```
App.jsx
├── Navbar
│   ├── Logo/Brand
│   ├── Navigation Links
│   └── User Menu / Auth Buttons
│
├── Routes
│   ├── Public Routes
│   │   ├── Home
│   │   │   ├── Hero Section
│   │   │   ├── SearchFilter
│   │   │   └── BlogCard (multiple)
│   │   ├── BlogView
│   │   │   ├── Blog Header
│   │   │   ├── Blog Content
│   │   │   ├── Like/Comment Buttons
│   │   │   └── Comments List
│   │   ├── Login
│   │   └── Register
│   │
│   ├── Protected Routes
│   │   ├── Dashboard
│   │   │   ├── Stats Cards
│   │   │   ├── Create Blog Button
│   │   │   └── My Blogs Grid
│   │   ├── CreateBlog
│   │   │   ├── Blog Form
│   │   │   ├── ReactQuill Editor
│   │   │   └── Image Upload
│   │   ├── EditBlog
│   │   │   ├── Blog Form (pre-filled)
│   │   │   ├── ReactQuill Editor
│   │   │   └── Image Upload
│   │   └── Profile
│   │       ├── Profile Form
│   │       └── Avatar Upload
│   │
│   └── Admin Routes
│       └── AdminDashboard
│           ├── Statistics Overview
│           ├── Users Table
│           ├── Blogs Table
│           └── Analytics
│
└── Footer
    ├── About Section
    ├── Quick Links
    └── Social Media Links
```

---

## State Management Architecture

### Redux Store Structure

```
store/
├── authSlice
│   ├── userInfo (from localStorage)
│   ├── loading
│   └── error
│
├── blogSlice
│   ├── blogs (array)
│   ├── currentBlog (object)
│   ├── page
│   ├── pages
│   ├── total
│   ├── loading
│   └── error
│
└── adminSlice
    ├── users (array)
    ├── blogs (array)
    ├── stats (object)
    ├── loading
    └── error
```

---

## Security Layers

```
┌─────────────────────────────────────┐
│   Client-Side Security              │
│   - Input Validation                │
│   - XSS Protection (DOMPurify)      │
│   - Token Storage (localStorage)    │
│   - Protected Routes                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Network Security                  │
│   - HTTPS (in production)           │
│   - CORS Configuration              │
│   - JWT in Headers                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Server-Side Security              │
│   - JWT Verification                │
│   - Password Hashing (bcrypt)       │
│   - Input Validation                │
│   - Error Handling                  │
│   - Rate Limiting (recommended)     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Database Security                 │
│   - Connection String in .env       │
│   - User Authentication             │
│   - IP Whitelisting                 │
│   - Data Validation                 │
└─────────────────────────────────────┘
```

---

## Development Workflow

```
Developer
    │
    ├── 1. Make Changes to Code
    │
    ├── 2. Backend Auto-Reload (nodemon)
    │   └── Server restarts automatically
    │
    ├── 3. Frontend Hot Reload (Vite)
    │   └── Browser updates automatically
    │
    ├── 4. Test in Browser
    │   ├── Check functionality
    │   ├── View console logs
    │   └── Inspect network requests
    │
    └── 5. Commit to Git
        └── Push to repository
```

---

## Deployment Architecture

### Production Setup

```
┌─────────────────────┐
│   Users/Browsers    │
└──────────┬──────────┘
           │
    ┌──────▼───────┐
    │   Vercel     │ (Frontend Hosting)
    │   - CDN      │
    │   - HTTPS    │
    └──────┬───────┘
           │ API Calls
    ┌──────▼───────┐
    │   Render     │ (Backend Hosting)
    │   - Node.js  │
    │   - Express  │
    └──────┬───────┘
           │
    ┌──────▼─────────┐
    │ MongoDB Atlas  │ (Database)
    │   - Cloud DB   │
    │   - Backups    │
    └────────────────┘

    ┌────────────────┐
    │   Cloudinary   │ (Image Storage)
    │   - CDN        │
    │   - Transform  │
    └────────────────┘
```

---

## Technology Stack Visualization

```
┌──────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│  React 18 · Redux Toolkit · React Router · Tailwind CSS  │
│  React-Quill · React Icons · React-Toastify · DOMPurify  │
└──────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                       │
│     Node.js 14+ · Express.js · JWT · Bcrypt · Multer     │
└──────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────┐
│                      DATA LAYER                           │
│         MongoDB · Mongoose · Cloudinary API               │
└──────────────────────────────────────────────────────────┘
```

---

## File Upload Flow

```
User Selects Image
        ↓
Convert to Base64
        ↓
Send to Backend API
        ↓
POST /api/blogs/upload
        ↓
Cloudinary API
        ↓
Image Stored in Cloud
        ↓
Return Image URL
        ↓
Store URL in Blog Document
        ↓
Display Image from CDN
```

---

This architecture is designed to be:
- ✅ **Scalable**: Can handle increased traffic
- ✅ **Maintainable**: Clean separation of concerns
- ✅ **Secure**: Multiple security layers
- ✅ **Performant**: Optimized data flow
- ✅ **Modular**: Easy to extend and modify
