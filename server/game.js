module.exports = exports = Game

const Player = require('./player.js')

const serverTag = '<span style="color: red"><b>Server </b></span>'

function Game (io, sockets, room) {
  this.io = io
  this.players = []
  this.room = room
  this.updateChat = false

    // Initialize players and chat
  this.players.push(new Player(1, sockets[0]))
  this.players.push(new Player(2, sockets[1]))

  var game = this
  var chatLog = []

  this.players.forEach(function (player, i) {
        // Join the room
    player.socket.join(room)

        // Handle chat messages sent by players
    player.socket.on('newChatMsg', function (msg) {
      io.to(room).emit('updateChatLog', (player.Tag + ' : ' + msg))
    })
  })

  io.to(room).emit('updateChatLog', (serverTag + ': Game has begun!'))
  console.log('The game has begun!')
}

Game.prototype.update = function () {

}
