const express = require('express');
const cors = require('cors');
const messagesRoute = require('./routes/messages');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://64.226.76.213:3000',
    'http://64.226.76.213',
    'https://64.226.76.213:3000',
    'https://64.226.76.213',
    'http://aswe.javachi.uz',
    'https://aswe.javachi.uz'
  ],
  credentials: true,
}));
app.use(express.json());

app.options('/api/messages', cors({
  origin: [
    'http://localhost:3000',
    'http://64.226.76.213:3000',
    'http://64.226.76.213',
    'https://64.226.76.213:3000',
    'https://64.226.76.213',
    'http://aswe.javachi.uz',
    'https://aswe.javachi.uz'
  ],
  credentials: true,
}));

// Mount the only route
app.use('/api/messages', messagesRoute);

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('Backend is running.');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});