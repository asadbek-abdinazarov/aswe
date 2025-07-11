#!/bin/bash

echo "🚀 Starting Backend Server..."

# Navigate to backend directory
cd backend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🔥 Starting server on port 5000..."
npm run dev 