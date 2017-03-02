"use strict";

module.exports = exports = Player;

function Player(socket) {
    this.id = 'player';
    this.socket = socket;

    this.send = {
        id: this.id
    };
}

Player.prototype.update = function () {
    this.send = {
        id: this.id
    };
}
