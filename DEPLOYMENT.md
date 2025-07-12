# Deployment Guide

## Server Setup

### 1. Backend Server Setup

The backend server needs to be running on port 5001 to handle contact form submissions.

#### Option A: Using the start script
```bash
# Make the script executable
chmod +x start-backend.sh

# Start the backend
./start-backend.sh
```

#### Option B: Manual start
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

### 2. Frontend Configuration

The frontend is already configured to connect to:
- Backend API: `http://your-backend-ip:your-port/api`
- CORS is configured to allow requests from the server IP

### 3. Port Configuration

- Frontend: Port 3000 (Next.js)
- Backend: Port 5001 (Express.js)

### 4. Environment Variables (Optional)

If you want to use custom Telegram bot settings, set these environment variables:

```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"
```

### 5. Testing the Contact Form

1. Make sure both frontend and backend are running
2. Go to the contact section on your website
3. Fill out the form and submit
4. Check the backend console for logs
5. You should receive a message on Telegram

### 6. Troubleshooting

If the contact form still shows "Error sending message":

1. Check if backend is running: `curl http://your-backend-ip:your-port/`
2. Check backend logs for errors
3. Verify CORS configuration in `backend/server.js`
4. Check if port 5001 is open and accessible

### 7. Production Deployment

For production, consider:
- Using PM2 to manage the Node.js process
- Setting up a reverse proxy (nginx)
- Using environment variables for sensitive data
- Setting up SSL certificates for HTTPS 