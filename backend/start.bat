@echo off
REM Quick Start Script for Smart P-CRM Backend on Windows

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          Smart P-CRM Backend - Quick Start for Windows         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Python is not installed or not in PATH
    echo   Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

echo ✓ Python found
python --version

REM Check if MongoDB is running
timeout /t 1 /nobreak >nul
echo.
echo Checking MongoDB connection...
mongosh --eval "db.adminCommand('ping')" >nul 2>&1
if errorlevel 1 (
    echo.
    echo ✗ MongoDB is not running!
    echo   Please start MongoDB first:
    echo   - On Windows: net start MongoDB
    echo   - Or download from: https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)
echo ✓ MongoDB is running

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo.
    echo Creating Python virtual environment...
    python -m venv venv
    echo ✓ Virtual environment created
)

REM Activate virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo Installing dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ✗ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

REM Seed database
echo.
echo Seeding database with test data...
python seed_data.py
if errorlevel 1 (
    echo ✗ Failed to seed database
    pause
    exit /b 1
)

REM Start server
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                  Starting Backend Server                       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📍 API URL: http://localhost:8000
echo 📚 Swagger Docs: http://localhost:8000/docs
echo 🔧 ReDoc: http://localhost:8000/redoc
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py
