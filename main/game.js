'use strict'

class Game {
  constructor () {
    this.availableCharacters = []
    this.chatLog = ''
    this.gameId = undefined
    this.paused = false
    this.player = undefined
  }
}

module.exports = {
  Game: Game
}
