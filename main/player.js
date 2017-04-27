'use strict'

// module.exports = exports = Player;

// function Player(id, socket) {
//     this.id = id;
//     this.Tag = '<span style="color: royalblue">Player ' + id + '</span>';
//     this.socket = socket;

//     this.send = {
//         id: this.id
//     };
// }

// Player.prototype.update = function () {
//     this.send = {
//         id: this.id
//     };
// }

class Player {
  constructor (id, socket, charID) {
    this.id = id
    this.socket = socket
    this.tag = `<span style="color: royalblue">Player ${this.id}</span>`
    this.charID = charID
  }

  joinGame () {

  }

  update () {

  }
}

module.exports = {
  Player: Player
}
