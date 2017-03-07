"use strict";

module.exports = exports = Item;

function Item(socket) {
    this.id = 'item';
    this.socket = socket;

    this.send = {
        id: this.id
    };
}

Item.prototype.update = function () {
    this.send = {
        id: this.id
    };
}
