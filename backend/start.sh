#!/bin/bash

# Quick Start Script for Smart P-CRM Backend on macOS/Linux

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        Smart P-CRM Backend - Quick Start for macOS/Linux       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "✗ Python 3 is not installed"
    echo "  Please install Python 3.9+ from https://www.python.org/"
    exit 1
fi

echo "✓ Python found"
python3 --version

# Check if MongoDB is running
echo ""
echo "Checking MongoDB connection..."
if ! mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo ""
    echo "✗ MongoDB is not running!"
    echo "  Please start MongoDB:"
    echo "  - On macOS: brew services start mongodb-community"
    echo "  - On Linux: sudo systemctl start mongod"
    echo "  - Or download from: https://www.mongodb.com/try/download/community"
    echo ""
    exit 1
fi
echo "✓ MongoDB is running"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
echo ""
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "✗ Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"

# Seed database
echo ""
echo "Seeding database with test data..."
python seed_data.py
if [ $? -ne 0 ]; then
    echo "✗ Failed to seed database"
    exit 1
fi

# Start server
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  Starting Backend Server                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 API URL: http://localhost:8000"
echo "📚 Swagger Docs: http://localhost:8000/docs"
echo "🔧 ReDoc: http://localhost:8000/redoc"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python main.py
