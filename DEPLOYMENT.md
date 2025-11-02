# Deployment Guide

This guide will help you deploy your blogging platform to production.

## Prerequisites

- Git repository (GitHub, GitLab, etc.)
- MongoDB Atlas account (for cloud database)
- Cloudinary account (for image hosting)
- Hosting platform account (Render, Heroku, Railway, etc.)

---

## Part 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Create a username and password
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., "blogging-platform")

---

## Part 2: Cloudinary Setup

1. **Create Cloudinary Account**
   - Go to https://cloudinary.com/users/register/free
   - Sign up for a free account

2. **Get API Credentials**
   - Go to your Dashboard
   - Copy the following:
     - Cloud Name
     - API Key
     - API Secret

---

## Part 3: Backend Deployment (Render)

1. **Prepare Backend for Deployment**
   - Make sure your `.gitignore` includes `node_modules` and `.env`
   - Push your code to GitHub

2. **Create Render Account**
   - Go to https://render.com
   - Sign up using your GitHub account

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/Rit95ik/Blogging-app.git`
   - Configure the service:
     - **Name**: blogging-platform-backend
     - **Region**: Choose closest to your users
     - **Branch**: main
     - **Root Directory**: backend
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Add Environment Variables**
   Click "Advanced" and add these environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-strong-random-string>
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://blogging-platform-backend.onrender.com`)

---

## Part 4: Frontend Deployment (Vercel)

1. **Update Frontend Configuration**
   
   In `frontend/.env`:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

2. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up using your GitHub account

3. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository: `https://github.com/Rit95ik/Blogging-app.git`
   - Configure the project:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-app.vercel.app`

---

## Alternative: Deploy Both on Render

### Backend (Same as above)

### Frontend on Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository: `https://github.com/Rit95ik/Blogging-app.git`
   - Configure:
     - **Name**: blogging-platform-frontend
     - **Branch**: main
     - **Root Directory**: frontend
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: dist

2. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy**
   - Click "Create Static Site"

---

## Post-Deployment Configuration

### 1. Update CORS Settings

In `backend/server.js`, update CORS configuration:

```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### 2. Create Admin User

1. Register a user through the frontend
2. Connect to MongoDB Atlas:
   - Go to your cluster → "Collections"
   - Find the `users` collection
   - Find your user document
   - Click "Edit Document"
   - Add/change `"isAdmin": true`
   - Click "Update"

### 3. Test Your Application

- Test user registration and login
- Test blog creation, editing, and deletion
- Test image uploads
- Test comments and likes
- Test admin dashboard access

---

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Troubleshooting

### Backend Issues

**Problem**: Server crashes or won't start
- Check Render logs for error messages
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas is accessible (IP whitelist)

**Problem**: Database connection errors
- Verify MongoDB connection string
- Check database user credentials
- Ensure IP whitelist includes 0.0.0.0/0

**Problem**: Image upload fails
- Verify Cloudinary credentials
- Check Cloudinary dashboard for quota limits

### Frontend Issues

**Problem**: API requests fail
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

**Problem**: Build fails
- Check Node version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

---

## Performance Optimization

### Backend

1. **Enable Compression**
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Rate Limiting**
   ```javascript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

3. **Database Indexing**
   - Already implemented in Blog model for text search

### Frontend

1. **Code Splitting**
   - Already handled by Vite

2. **Image Optimization**
   - Use Cloudinary transformations for responsive images

3. **Lazy Loading**
   - Implement lazy loading for routes

---

## Monitoring

### Backend
- Use Render's built-in monitoring
- Consider adding Sentry for error tracking
- Monitor MongoDB Atlas metrics

### Frontend
- Use Vercel Analytics
- Monitor Core Web Vitals
- Consider adding Google Analytics

---

## Backup Strategy

1. **Database Backups**
   - MongoDB Atlas provides automatic backups (on paid plans)
   - Set up manual backup schedule

2. **Code Backups**
   - Regular Git commits
   - Multiple branches for different environments

3. **Environment Variables**
   - Keep secure backup of all environment variables

---

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] MongoDB database user has limited permissions
- [ ] JWT secret is strong and unique
- [ ] CORS is configured for specific origins
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] Dependencies are up to date
- [ ] Input validation is in place
- [ ] XSS protection is implemented
- [ ] API rate limiting is configured

---

## Scaling Considerations

When your app grows:

1. **Upgrade Database**
   - Move to MongoDB Atlas paid plan
   - Enable additional features (backups, analytics)

2. **Upgrade Hosting**
   - Move from free to paid Render/Vercel plans
   - Consider dedicated hosting solutions

3. **Add CDN**
   - Cloudinary provides CDN for images
   - Consider Cloudflare for frontend assets

4. **Implement Caching**
   - Redis for session management
   - Query result caching

---

## Support

For issues or questions:
- Check the README.md
- Review API_DOCUMENTATION.md
- Check application logs
- Contact support team

---

Good luck with your deployment! 🚀