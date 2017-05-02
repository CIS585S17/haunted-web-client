"use strict";

module.exports = exports = Event;

function Event(id, player) {
    this.id = id;
    this.playerInvolved = player;
    this.cinematic;

    this.send = {
        id: this.id
    };
    this.setStatChanges(this.playerInvolved, this.id);
}

Event.prototype.update = function () {
    this.send = {
        id: this.id
    };
}

Event.prototype.setStatChanges = function(player, id){
    switch(id){
      case "0":
        player.health --;
      break;
    }
}
