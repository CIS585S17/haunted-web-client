const {RoomGraph} = require('./server/room');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var players = [];
var games = 0;
const Game = require('./server/game');

// let graph = new RoomGraph(`${__dirname}/public/models`);

// Server starts listening on port 5000
server.listen('5000', ()=>{
    console.log('Listening at http://localhost:5000');
});

app.use(express.static('public'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/static', express.static('node_modules'));

// Handles a player connection
io.on('connection', function (socket) {
    console.log('A user connected');
    players.push(socket);

    // If we have two players, Launch a game instance
    if (players.length == 2) {
        new Game(io, players, games);
        players = [];
        games++;
    }
});
