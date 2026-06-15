const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Socket } = require('dgram');
const rateLimit = require('express-rate-limit');
dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new server(server, { cors:
{ origin: "*"} });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/upload', require('./routes/upload'));

// Real-time Chat
io.on('connection', (Socket) => {
console.log('User connected:', Socket.id);

Socket.on('joinChat', (room) =>
    Socket.join(room));

Socket.on('sendMessage', (data) => {
 const { room, message, sender } = data;
 io.to(room).emit('receiveMessage',
      { message, sender, timetamp: new DataTransfer() });
});

Socket.on('disconnect', () =>
console.log('User disconnected'));
});

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: { error: 'Too many requests, please try again later.' },
    standarHeaders: true,
    legacyHeaders: false,
});

app.use(limiter); // Apply globallu or to specific routes

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
