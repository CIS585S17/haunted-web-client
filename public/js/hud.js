'use strict'

class HUD {
  constructor () {
    this.active = false
    this.chatTextArea = document.getElementById('chatTextArea')
    this.chatLogDiv = document.getElementById('chatLogDiv')
    this.chatLog = []
  }

  update (active) {
      // No point in setting things again if active is the same value it was in the previous update
    if (active !== this.active) {
      this.active = active
      if (this.active) {
        this.chatTextArea.style.visibility = 'visible'
        this.chatLogDiv.style.opacity = 0.9
        document.exitPointerLock()
      } else {
        this.chatTextArea.style.visibility = 'hidden'
        this.chatLogDiv.style.opacity = 0.7
        document.body.requestPointerLock()
      }
    }

    this.chatTextArea.style.opacity = document.activeElement === this.chatTextArea ? 1.0 : 0.9
  }

  addChatMsg (msg) {
    var chatDepth = 10

    if (this.chatLog.length == 10) {
      this.chatLog.shift()
    }

    this.chatLog.push(msg)
    chatDepth = 10 - this.chatLog.length
    this.chatLogDiv.innerHTML = ''

    while (chatDepth != 0) {
      this.chatLogDiv.innerHTML += ('<br>')
      chatDepth--
    }
    this.chatLog.forEach(function (m) {
      this.chatLogDiv.innerHTML += ('<br>' + m)
    })
  }
}

module.exports = {
  HUD: HUD
}

// var chatTextArea = document.getElementById('chatTextArea')
// var chatLogDiv = document.getElementById('chatLogDiv')

// var chatLog = []

// function HUD () {
//   this.active = false
// }



// HUD.prototype.update = function (active) {
//     // No point in setting things again if active is the same value it was in the previous update
//   if (active != this.active) {
//     this.active = active
//     if (this.active) {
//       chatTextArea.style.visibility = 'visible'
//       chatLogDiv.style.opacity = 0.9
//       document.exitPointerLock()
//     } else {
//       chatTextArea.style.visibility = 'hidden'
//       chatLogDiv.style.opacity = 0.7
//       document.body.requestPointerLock()
//     }
//   }

//   chatTextArea.style.opacity = document.activeElement == chatTextArea ? 1.0 : 0.9
// }

// HUD.prototype.addChatMsg = function (msg) {
//   var chatDepth = 10

//   if (chatLog.length == 10) {
//     chatLog.shift()
//   }

//   chatLog.push(msg)
//   chatDepth = 10 - chatLog.length
//   chatLogDiv.innerHTML = ''

//   while (chatDepth != 0) {
//     chatLogDiv.innerHTML += ('<br>')
//     chatDepth--
//   }
//   chatLog.forEach(function (m) {
//     chatLogDiv.innerHTML += ('<br>' + m)
//   })
// }
