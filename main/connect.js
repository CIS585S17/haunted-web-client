const io = require('socket.io-client')
// let socket = io('ws://cslinux.cs.ksu.edu:5000')
// socket.on('connect', () => {
//   console.log('connected out of class')
// })

class Connect {
  constructor () {
    this.socket = io('ws://cslinux.cs.ksu.edu:3000')
    this.message = 'i work'
  }

  connect (gameName) {
    // this.socket.on('connect', () => {
    //   console.log('connected in class')
    // })
    this.socket.emit('host-game', gameName)
  }

  work (msg) {
    // this.socket.on('connect', () => {
    //   console.log('work function')
    // })
    this.socket.emit('join', msg)
  }

  getGames () {
    this.socket.on('get-games', (games) => {
      console.log(games)
      return games
    })
  }
}

module.exports = {
  Connect: Connect
}
