# Quick Start Guide

## Step 1: Install Backend Dependencies

Open a terminal and run:
```powershell
cd backend
npm install
```

## Step 2: Install Frontend Dependencies

Open another terminal and run:
```powershell
cd frontend
npm install
```

## Step 3: Configure Environment Variables

### Backend Configuration
The `.env` file in the backend directory is already created. Update the following:
- **MONGO_URI**: Your MongoDB connection string
- **JWT_SECRET**: A secure random string
- **CLOUDINARY_CLOUD_NAME**: Your Cloudinary cloud name
- **CLOUDINARY_API_KEY**: Your Cloudinary API key
- **CLOUDINARY_API_SECRET**: Your Cloudinary API secret

Get Cloudinary credentials from: https://cloudinary.com/users/register/free

### Frontend Configuration
The `.env` file in the frontend directory is already created with default values.

## Step 4: Start MongoDB

Make sure MongoDB is running on your local machine or use MongoDB Atlas.

For local MongoDB:
```powershell
mongod
```

## Step 5: Start the Backend Server

In the backend directory:
```powershell
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

## Step 6: Start the Frontend

In the frontend directory (new terminal):
```powershell
cd frontend
npm run dev
```

The app will start on `http://localhost:3000`

## Step 7: Create Admin User

1. Register a new user through the UI at `http://localhost:3000/register`
2. Open MongoDB Compass or MongoDB shell
3. Find your user in the `users` collection
4. Update the user document to set `isAdmin: true`

Example MongoDB command:
```javascript
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { isAdmin: true } }
)
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the MONGO_URI in your `.env` file

### Port Already in Use
- Change the PORT in backend `.env` file
- Change the port in frontend `vite.config.js` and update VITE_API_URL

### Cloudinary Upload Errors
- Verify your Cloudinary credentials in `.env`
- Make sure you have internet connection

## Testing the Application

1. Register a new account
2. Login with your credentials
3. Create a new blog post
4. Test commenting and liking features
5. Update your profile
6. If admin, access the admin dashboard at `/admin`

## Production Build

### Backend
```powershell
cd backend
npm start
```

### Frontend
```powershell
cd frontend
npm run build
npm run preview
```

## Additional Notes

- The app uses Tailwind CSS for styling - no additional configuration needed
- React-Quill is pre-configured for the rich text editor
- Redux Toolkit is used for state management
- All routes are protected with JWT authentication

Enjoy building with BlogHub! 🚀
