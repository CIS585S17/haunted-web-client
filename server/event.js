"use strict";

module.exports = exports = Event;

function Event(socket) {
    this.id = 'event';
    this.socket = socket;

    this.send = {
        id: this.id
    };
}

Event.prototype.update = function () {
    this.send = {
        id: this.id
    };
}
