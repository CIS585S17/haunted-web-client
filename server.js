'use strict'

const {RoomGraph} = require('./server/room')
const {Game} = require('./server/game')

var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

let playerSockets = []
let games = []
// let games = 0

// let graph = new RoomGraph(`${__dirname}/public/models`);

// Server starts listening on port 5000
server.listen('5000', () => {
  console.log('Listening at http://localhost:5000')
})

app.use(express.static('public'))
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/static', express.static('node_modules'))

// Handles a player connection
io.on('connection', function (socket) {
  // console.log('A user connected')
  // players.push(socket)

  //   // If we have two players, Launch a game instance
  // if (players.length == 2) {
  //   new Game(io, players, games)
  //   players = []
  //   games++
  // }

  // field for game name, each game can be named by host
  socket.on('host-game', (player) => {
    games.push(new Game(io, new RoomGraph(`${__dirname}/public/models`), (games.length - 1)))
    games[games.length - 1].addPlayer(player)
  })

  socket.on('join', (data) => {
    games[data.gameIndex].addPlayer(data.player)
  })

  socket.on('start-game', () => {

  })
})
