const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const adminRoutes = require('./routes/adminRoutes');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/admin', adminRoutes);

// Socket.IO setup for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (msg) => {
    io.emit('message', msg); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
