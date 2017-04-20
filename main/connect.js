const io = require('socket.io-client')
// let socket = io('ws://cslinux.cs.ksu.edu:5000')
// socket.on('connect', () => {
//   console.log('connected out of class')
// })

class Connect {
  constructor () {
    // this.socket = io('ws://cslinux.cs.ksu.edu:5454')
    this.socket = io('http://localhost:5454')
    // this.socket = io('ws://70.179.169.131:5454')
    this.message = 'i work'
  }

  host (gameName) {
    // this.socket.on('connect', () => {
    //   console.log('connected in class')
    // })
    this.socket.emit('host-game', gameName)
  }

  join (id) {
    this.socket.emit('join', id)
  }

  getGames (callback) {
    this.socket.emit('get', 'get the game')
    this.socket.on('get-games', (games) => {
      console.log(games)
      callback(games)
    })
  }

  startGame (callback) {
    this.socket.on('start-game', (start) => {
      console.log(start)
      callback(start)
    })
  }
}

module.exports = {
  Connect: Connect
}
