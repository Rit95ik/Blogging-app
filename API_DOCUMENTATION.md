# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token_here"
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "avatar": "avatar_url",
  "bio": "User bio",
  "token": "jwt_token_here"
}
```

---

### Get User Profile
**GET** `/auth/profile`

Get authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "User bio",
  "avatar": "avatar_url",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Update User Profile
**PUT** `/auth/profile`

Update authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "bio": "Updated bio",
  "avatar": "new_avatar_url",
  "password": "newpassword123" // Optional
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "bio": "Updated bio",
  "avatar": "new_avatar_url",
  "isAdmin": false,
  "token": "new_jwt_token"
}
```

---

## Blog Endpoints

### Get All Blogs
**GET** `/blogs`

Get all published blogs with optional filtering.

**Query Parameters:**
- `search` - Search by title or content
- `category` - Filter by category
- `author` - Filter by author ID
- `pageNumber` - Page number for pagination (default: 1)

**Example:**
```
GET /blogs?search=react&category=Technology&pageNumber=1
```

**Response:**
```json
{
  "blogs": [
    {
      "_id": "blog_id",
      "title": "Blog Title",
      "content": "Blog content...",
      "excerpt": "Short description",
      "coverImage": "image_url",
      "category": "Technology",
      "tags": ["react", "javascript"],
      "author": {
        "_id": "author_id",
        "name": "Author Name",
        "email": "author@example.com",
        "avatar": "avatar_url"
      },
      "likes": ["user_id_1", "user_id_2"],
      "comments": [],
      "views": 100,
      "status": "published",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "pages": 5,
  "total": 50
}
```

---

### Get Single Blog
**GET** `/blogs/:id`

Get a single blog by ID. Increments view count.

**Response:**
```json
{
  "_id": "blog_id",
  "title": "Blog Title",
  "content": "Full blog content...",
  "excerpt": "Short description",
  "coverImage": "image_url",
  "category": "Technology",
  "tags": ["react", "javascript"],
  "author": {
    "_id": "author_id",
    "name": "Author Name",
    "email": "author@example.com",
    "avatar": "avatar_url",
    "bio": "Author bio"
  },
  "likes": ["user_id_1"],
  "comments": [
    {
      "_id": "comment_id",
      "user": {
        "_id": "user_id",
        "name": "Commenter Name",
        "avatar": "avatar_url"
      },
      "name": "Commenter Name",
      "comment": "Great post!",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "views": 101,
  "status": "published",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Create Blog
**POST** `/blogs`

Create a new blog post.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "<p>Blog content with HTML...</p>",
  "excerpt": "Short description",
  "coverImage": "image_url",
  "category": "Technology",
  "tags": ["react", "javascript"],
  "status": "published" // or "draft"
}
```

**Response:**
```json
{
  "_id": "blog_id",
  "title": "My New Blog Post",
  "content": "<p>Blog content with HTML...</p>",
  "author": {
    "_id": "author_id",
    "name": "Author Name",
    "email": "author@example.com",
    "avatar": "avatar_url"
  },
  // ... other blog fields
}
```

---

### Update Blog
**PUT** `/blogs/:id`

Update an existing blog post. Only the author can update.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "<p>Updated content...</p>",
  "excerpt": "Updated description",
  "coverImage": "new_image_url",
  "category": "Lifestyle",
  "tags": ["lifestyle", "tips"],
  "status": "published"
}
```

**Response:**
```json
{
  // Updated blog object
}
```

---

### Delete Blog
**DELETE** `/blogs/:id`

Delete a blog post. Only the author can delete.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Blog removed"
}
```

---

### Add Comment
**POST** `/blogs/:id/comments`

Add a comment to a blog post.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "comment": "Great article! Very helpful."
}
```

**Response:**
```json
{
  // Updated blog object with new comment
}
```

---

### Toggle Like
**POST** `/blogs/:id/likes`

Like or unlike a blog post.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  // Updated blog object with updated likes
}
```

---

### Upload Image
**POST** `/blogs/upload`

Upload an image to Cloudinary.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,..." // Base64 encoded image
}
```

**Response:**
```json
{
  "url": "https://res.cloudinary.com/...",
  "public_id": "blog-images/xyz123"
}
```

---

## Admin Endpoints

All admin endpoints require authentication with an admin account.

**Headers:** `Authorization: Bearer <admin-token>`

### Get Dashboard Statistics
**GET** `/admin/stats`

Get comprehensive dashboard statistics.

**Response:**
```json
{
  "totalUsers": 100,
  "totalBlogs": 500,
  "publishedBlogs": 450,
  "draftBlogs": 50,
  "activeUsers": 95,
  "inactiveUsers": 5,
  "recentBlogs": [
    // Array of recent blog objects
  ],
  "topAuthors": [
    {
      "_id": {
        "_id": "author_id",
        "name": "Author Name",
        "email": "author@example.com",
        "avatar": "avatar_url"
      },
      "blogCount": 25,
      "totalViews": 5000,
      "totalLikes": 1500
    }
  ]
}
```

---

### Get All Users
**GET** `/admin/users`

Get all users in the system.

**Response:**
```json
[
  {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "bio": "User bio",
    "avatar": "avatar_url",
    "isAdmin": false,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Delete User
**DELETE** `/admin/users/:id`

Delete a user account. Cannot delete admin users.

**Response:**
```json
{
  "message": "User removed"
}
```

---

### Toggle User Active Status
**PUT** `/admin/users/:id/toggle-active`

Activate or deactivate a user account.

**Response:**
```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "isActive": false // toggled value
}
```

---

### Get All Blogs (Admin)
**GET** `/admin/blogs`

Get all blogs including drafts.

**Response:**
```json
[
  {
    // Blog object with all fields
  }
]
```

---

### Delete Blog (Admin)
**DELETE** `/admin/blogs/:id`

Delete any blog post.

**Response:**
```json
{
  "message": "Blog removed"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "message": "Error message describing what went wrong",
  "stack": "Error stack trace (only in development mode)"
}
```

### Common HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider adding rate limiting to prevent abuse.

---

## CORS

CORS is enabled for all origins in development. In production, configure CORS to only allow your frontend domain.

---

## Categories

Available blog categories:
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

---

## Notes

1. All timestamps are in ISO 8601 format
2. Passwords are hashed using bcrypt
3. JWT tokens expire after 30 days by default
4. Images are stored on Cloudinary
5. Blog content supports HTML (sanitized on the frontend with DOMPurify)
6. Search is case-insensitive
7. Pagination returns 10 blogs per page by default
