module.exports = exports = Game;

const Player = require('./player.js');

function Game(io, sockets, room) {
    this.io = io;
    this.players = [];
    this.room = room;

    // Initialize the players
    this.players.push(new Player(sockets[0]));
    this.players.push(new Player(sockets[1]));

    this.players.forEach(function (player, i) {

        // Join the room
        player.socket.join(room);

        // Example function for receiving end of a socket emit
        //player.socket.on('keyDown', function () {
        //    console.log("Player " + (i+1) + " pressed a key");
        //});
    });

    var game = this;

    console.log("Game is on");
}