// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Listen for a tile draw event
//     socket.on('drawTile', (data) => {
//         // Broadcast draw event to other clients
//         io.emit('tileDrawn', data);
//     });

//     // Listen for discard event
//     socket.on('discardTile', (data) => {
//         io.emit('tileDiscarded', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    // Join a game room (you can use a specific room ID or create a new one)
    socket.join('game-room-1');

    socket.on('drawTile', (data) => {
        // Broadcast the draw event to everyone else in the room
        socket.to('game-room-1').emit('playerDrewTile', data);
    });

    socket.on('discardTile', (data) => {
        // Broadcast the discard event to everyone else in the room
        socket.to('game-room-1').emit('playerDiscardedTile', data);
    });

    socket.on('chatMessage', (message) => {
        // Broadcast chat messages to all players in the room
        io.to('game-room-1').emit('receiveChatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
    });
});