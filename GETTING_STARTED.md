# 🎯 Getting Started Checklist

Use this checklist to set up and run your blogging platform.

## ✅ Pre-Installation Checklist

- [ ] Node.js installed (v14 or higher)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Cloudinary account created (free tier is fine)
- [ ] Git installed (for version control)
- [ ] Code editor installed (VS Code recommended)
- [ ] Terminal/Command Prompt access

---

## 📦 Installation Steps

### Step 1: Install Dependencies

- [ ] Open terminal in project root directory
- [ ] Run `.\install.bat` (Windows) OR manually:
  - [ ] `cd backend && npm install`
  - [ ] `cd ../frontend && npm install`
- [ ] Wait for installation to complete (may take 2-5 minutes)

### Step 2: MongoDB Setup

**Option A: Local MongoDB**
- [ ] Start MongoDB service
  - Windows: MongoDB Compass or `net start MongoDB`
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (free tier M0)
- [ ] Create database user with username and password
- [ ] Whitelist IP address (0.0.0.0/0 for development)
- [ ] Get connection string

### Step 3: Cloudinary Setup

- [ ] Sign up at https://cloudinary.com/users/register/free
- [ ] Go to Dashboard
- [ ] Copy the following credentials:
  - [ ] Cloud Name
  - [ ] API Key
  - [ ] API Secret

### Step 4: Configure Backend Environment

- [ ] Navigate to `backend/` folder
- [ ] Open `.env` file
- [ ] Update the following variables:

```env
# For Local MongoDB:
MONGO_URI=mongodb://localhost:27017/blogging-platform

# For MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogging-platform

# Generate a strong JWT secret (min 32 characters)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# Add your Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

- [ ] Save the `.env` file

### Step 5: Configure Frontend Environment

- [ ] Navigate to `frontend/` folder
- [ ] Verify `.env` file contains:
```env
VITE_API_URL=http://localhost:5000
```
- [ ] This should already be set correctly for local development

---

## 🚀 Running the Application

### Terminal 1: Start Backend Server

- [ ] Open terminal
- [ ] Navigate to backend folder: `cd backend`
- [ ] Run: `npm run dev`
- [ ] Wait for message: "✅ MongoDB Connected: ..." and "🚀 Server running..."
- [ ] Backend is now running at http://localhost:5000

### Terminal 2: Start Frontend Server

- [ ] Open a NEW terminal (keep backend running)
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Run: `npm run dev`
- [ ] Wait for message with local URL
- [ ] Frontend is now running at http://localhost:3000

### Access the Application

- [ ] Open browser
- [ ] Go to http://localhost:3000
- [ ] You should see the BlogHub homepage

---

## 👤 Create Your First User

### Register an Account

- [ ] Click "Sign Up" or go to http://localhost:3000/register
- [ ] Fill in the registration form:
  - [ ] Full Name
  - [ ] Email Address
  - [ ] Password (minimum 6 characters)
  - [ ] Confirm Password
- [ ] Click "Sign Up"
- [ ] You should be redirected to the Dashboard

### Create Admin Account

**Option 1: Using MongoDB Compass (Recommended)**
- [ ] Open MongoDB Compass
- [ ] Connect to your database
- [ ] Navigate to `blogging-platform` database → `users` collection
- [ ] Find your user document
- [ ] Click "Edit Document"
- [ ] Add or change: `"isAdmin": true`
- [ ] Click "Update"

**Option 2: Using MongoDB Shell**
- [ ] Open MongoDB shell or terminal
- [ ] Connect to database
- [ ] Run:
```javascript
use blogging-platform
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```
- [ ] Logout and login again to see admin features

---

## ✨ Test Core Features

### Basic User Features

- [ ] **Login/Logout**
  - [ ] Login with your credentials
  - [ ] Logout using the navbar button
  - [ ] Login again

- [ ] **Create Blog Post**
  - [ ] Click "Create New Blog" or navigate to `/create-blog`
  - [ ] Enter blog title
  - [ ] Write content using the rich text editor
  - [ ] Upload a cover image (optional)
  - [ ] Select a category
  - [ ] Add tags (optional)
  - [ ] Click "Create Blog"
  - [ ] Verify blog appears in your dashboard

- [ ] **Edit Blog Post**
  - [ ] Go to Dashboard
  - [ ] Click edit icon on your blog
  - [ ] Make changes
  - [ ] Click "Update Blog"
  - [ ] Verify changes are saved

- [ ] **Delete Blog Post**
  - [ ] Go to Dashboard
  - [ ] Click delete icon on a blog
  - [ ] Confirm deletion
  - [ ] Verify blog is removed

- [ ] **View Blog**
  - [ ] Click on any blog card
  - [ ] Verify blog content displays correctly
  - [ ] Check that view count increases

- [ ] **Like a Blog**
  - [ ] Open any blog post
  - [ ] Click the heart icon
  - [ ] Verify like count increases
  - [ ] Click again to unlike

- [ ] **Comment on Blog**
  - [ ] Open any blog post
  - [ ] Scroll to comments section
  - [ ] Write a comment
  - [ ] Click "Post Comment"
  - [ ] Verify comment appears

- [ ] **Search Blogs**
  - [ ] Go to homepage
  - [ ] Enter search term in search bar
  - [ ] Click search
  - [ ] Verify filtered results

- [ ] **Filter by Category**
  - [ ] Go to homepage
  - [ ] Select a category from dropdown
  - [ ] Verify filtered results

- [ ] **Update Profile**
  - [ ] Go to Profile page
  - [ ] Update your name, bio
  - [ ] Upload an avatar
  - [ ] Click "Update Profile"
  - [ ] Verify changes are saved

### Admin Features (If you set isAdmin: true)

- [ ] **Access Admin Dashboard**
  - [ ] Look for "Admin" link in navbar
  - [ ] Click to go to `/admin`
  - [ ] Verify you can see dashboard

- [ ] **View Statistics**
  - [ ] Check total users, blogs, views, likes
  - [ ] View recent blogs
  - [ ] View top authors

- [ ] **Manage Users**
  - [ ] Click "Users" tab
  - [ ] View all users
  - [ ] Toggle user active status
  - [ ] Try deleting a non-admin user (create test user first)

- [ ] **Manage Blogs**
  - [ ] Click "Blogs" tab
  - [ ] View all blogs (including drafts)
  - [ ] Delete a blog post

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: MongoDB connection failed**
- [ ] Check if MongoDB is running
- [ ] Verify MONGO_URI in `.env` is correct
- [ ] For Atlas, check whitelist IP and credentials

**Error: Port 5000 already in use**
- [ ] Change PORT in backend `.env` to another port (e.g., 5001)
- [ ] Update VITE_API_URL in frontend `.env` accordingly

**Error: Module not found**
- [ ] Run `npm install` in backend folder again
- [ ] Delete `node_modules` and `package-lock.json`, then reinstall

### Frontend Won't Start

**Error: Port 3000 already in use**
- [ ] Change port in `frontend/vite.config.js`
- [ ] Or stop the process using port 3000

**Error: Cannot connect to backend**
- [ ] Verify backend is running
- [ ] Check VITE_API_URL in `.env`
- [ ] Check browser console for CORS errors

**Error: Module not found**
- [ ] Run `npm install` in frontend folder again
- [ ] Delete `node_modules` and `package-lock.json`, then reinstall

### Image Upload Not Working

- [ ] Verify Cloudinary credentials in backend `.env`
- [ ] Check image size (should be < 5MB)
- [ ] Check internet connection
- [ ] View Cloudinary dashboard for quota

### Can't Login/Register

- [ ] Check browser console for errors
- [ ] Verify backend is running
- [ ] Check Network tab in browser DevTools
- [ ] Ensure email format is valid
- [ ] Ensure password is at least 6 characters

---

## 📚 Next Steps After Setup

- [ ] Read through README.md for detailed information
- [ ] Review API_DOCUMENTATION.md to understand endpoints
- [ ] Explore the code structure
- [ ] Customize the design and branding
- [ ] Add your own logo
- [ ] Test all features thoroughly
- [ ] Consider deployment (see DEPLOYMENT.md)
- [ ] Set up Git repository for version control

---

## 🎨 Customization Ideas

- [ ] Change color scheme in `tailwind.config.js`
- [ ] Update app name from "BlogHub" to your brand
- [ ] Modify footer links
- [ ] Add custom favicon
- [ ] Change default categories
- [ ] Add more social media links
- [ ] Customize email templates (future feature)

---

## 📖 Documentation Reference

| When You Need... | Read This |
|-----------------|-----------|
| Overall project info | README.md |
| Quick setup steps | QUICK_START.md |
| API endpoint details | API_DOCUMENTATION.md |
| Production deployment | DEPLOYMENT.md |
| Feature list | FEATURES.md |
| Project overview | PROJECT_SUMMARY.md |
| Setup checklist | GETTING_STARTED.md (this file) |

---

## ✅ Final Verification

Before considering setup complete, verify:

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access homepage at http://localhost:3000
- [ ] Can register a new user
- [ ] Can login with created user
- [ ] Can create a blog post
- [ ] Can upload images
- [ ] Can view blog posts
- [ ] Can like and comment
- [ ] Can search and filter
- [ ] Can update profile
- [ ] Admin can access admin dashboard (if admin user created)

---

## 🎉 You're All Set!

If you've checked all the boxes above, congratulations! Your blogging platform is ready to use.

### What to Do Next:

1. **Explore**: Click around and test all features
2. **Create**: Write your first blog post
3. **Customize**: Make it your own
4. **Deploy**: Share it with the world (see DEPLOYMENT.md)
5. **Enhance**: Add new features from FEATURES.md

---

## 💡 Tips for Success

- Keep both terminal windows open while developing
- Use MongoDB Compass to visualize your data
- Check browser console for frontend errors
- Check terminal for backend errors
- Use React DevTools and Redux DevTools for debugging
- Save your work frequently
- Test on different screen sizes
- Keep your dependencies updated

---

## 📞 Need Help?

- Check the error message carefully
- Search the error in Google
- Review the code comments
- Check the documentation files
- Look at the browser console (F12)
- Check the terminal logs

---

**Happy Coding! 🚀**

Remember: The journey of a thousand blogs begins with a single post!
