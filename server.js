'use strict'

const {RoomGraph} = require('./server/room')
const {Game} = require('./server/game')
const {Player} = require('./server/player')


// var express = require('express')
// var app = express()
// var server = require('http').createServer(app)
var server = require('http').createServer((req, res)=>{
  res.end('hello');
});
var io = require('socket.io')(server)

let playerSockets = []
let games = []
// let games = 0

// let graph = new RoomGraph(`${__dirname}/public/models`);

// Server starts listening on port 5000
server.listen('5000', (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://localhost:5000')
})

// app.use(express.static('public'))
// app.get('/', function (req, res, next) {
//   res.sendFile(`${__dirname}/index.html`)
// })

// app.use('/static', express.static('node_modules'))

// Handles a player connection
io.on('connection', function (socket) {
  console.log('A user connected')
  // players.push(socket)

  //   // If we have two players, Launch a game instance
  // if (players.length == 2) {
  //   new Game(io, players, games)
  //   players = []
  //   games++
  // }

  socket.emit('join', 'join the game')

  // field for game name, each game can be named by host
  socket.on('host-game', (data) => {
    games.push(new Game((games.length - 1), io, data.name, new RoomGraph(`${__dirname}/public/models`)))
    games[games.length - 1].addPlayer(new Player(1, socket))
  })

  socket.on('join', (data) => {
    games[data.gameIndex].addPlayer(new Player(2, socket))
  })

  socket.on('start-game', () => {

  })

  socket.on('host', (msg) => {
    console.log('you called me')
    console.log(msg)
  })
})

io.on('error', (socket) => {

})
