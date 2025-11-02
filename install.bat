@echo off
echo ====================================
echo BlogHub - Installation Script
echo ====================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    pause
    exit /b %errorlevel%
)
cd ..
echo Backend dependencies installed successfully!
echo.

echo Step 2: Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b %errorlevel%
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo ====================================
echo Installation Complete!
echo ====================================
echo.
echo Next Steps:
echo 1. Update the .env file in the backend directory with your MongoDB URI and Cloudinary credentials
echo 2. Start MongoDB (if using local MongoDB)
echo 3. Run 'npm run dev' in the backend directory
echo 4. Run 'npm run dev' in the frontend directory
echo.
echo For detailed instructions, see QUICK_START.md
echo.
pause
