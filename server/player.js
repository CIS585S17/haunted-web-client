"use strict";

module.exports = exports = Player;

function Player(id, socket) {
    this.id = id;
    this.color = 'royalblue';
    this.socket = socket;
	this.tag = "Player"+this.id;

    this.send = {
        id: this.id
    };
}

Player.prototype.update = function () {
    this.send = {
        id: this.id
    };
}
