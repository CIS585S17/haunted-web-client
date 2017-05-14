'use strict'

class Game {
  constructor () {
    this.availableCharacters = []
    this.chatLog = ''
    this.gameId = undefined
    this.paused = false
    this.player = undefined
  }

  addPlayer (player) {
    this.player = player
  }
}

module.exports = {
  Game: Game
}
