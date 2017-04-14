const io = require('socket.io-client')
// let socket = io('ws://cslinux.cs.ksu.edu:5000')
// socket.on('connect', () => {
//   console.log('connected out of class')
// })

class Connect {
  constructor () {
    this.socket = io('ws://cslinux.cs.ksu.edu:5000')
    this.message = 'i work'
  }

  connect (msg) {
    this.socket.on('connect', () => {
      console.log('connected in class')
    })
    this.socket.emit('join', msg)
  }

  work (msg) {
    // this.socket.on('connect', () => {
    //   console.log('work function')
    // })
    this.socket.emit('join', msg)
  }
}

module.exports = {
  Connect: Connect
}
