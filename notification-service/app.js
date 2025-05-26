require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { logger } = require('./src/utils/logger');
const path = require('path');
const fs = require('fs');

// Middleware Parsing
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
require('./src/routes/notification.routes')(app);

// Health Check Route
app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'views', 'healthCheck.html');

  fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading HTML file', err);
      return res.status(500).send('Server error');
    }
    const replacedHTML = data.replace('<!--PORT_PLACEHOLDER-->', process.env.PORT);
    res.send(replacedHTML);
  });
});

// HTTP & WebSocket server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

// Socket connection log
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/notification')
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5101;
httpServer.listen(PORT, () => {
  logger.info(`Notification service running on port ${PORT}`);
});