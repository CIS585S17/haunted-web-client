'use strict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')
const {HUD} = require('./js/hud')

let windowId
var rotationY = 0
var rotationZ = 0

let movementInput = {
  up: false,
  down: false,
  left: false,
  right: false
}

let hudMode = false


ipcRenderer.on('load', (event, data) => {
  windowId = data.id
  let playerHUD = new HUD()

  playerHUD.addChatMsg(ipcRenderer.sendSync('update-chat-log', 'get message'))
  ipcRenderer.on('un-pause', (paused) => {
      // TODO: unpause the game when paused is false
  })
})

window.onmousemove = function (event) {
  // Only move the camera if the player is not navigating the hud
  if (!hudMode) {
    let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    rotationY -= movementX * -0.02
    if ((rotationZ - movementY * 0.02) >= -90 && (rotationZ - movementY * 0.02) <= 90) {
      rotationZ -= movementY * 0.02
    }
    rotationZ = Math.max(-90, Math.min(90, rotationZ))
  }
}
window.onmousedown = function (event) {
  document.body.requestPointerLock()
}
window.onkeydown = function (event) {
  // Only move the player if the player is not navigating the hud
  if (!hudMode) {
    switch (event.key) {
        case 'w':
        case 'W':
          movementInput.up = true
        break
        case 's':
        case 'S':
          movementInput.down = true
        break
        case 'a':
        case 'A':
          movementInput.left = true
        break
        case 'd':
        case 'D':
          movementInput.right = true

        break 
      case 'ArrowUp':
          movementInput.up = true
          //event.preventDefault()
        break
      case 'ArrowDown':
          movementInput.down = true
         // event.preventDefault()
        break
      case 'ArrowLeft':
          movementInput.left = true
         // event.preventDefault()
        break
      case 'ArrowRight':
          movementInput.right = true
         // event.preventDefault()
        break     
      case ' ':
        event.preventDefault()
        break
      case 'h':
        if (UI.style.visibility === 'hidden') {
          UI.style.visibility = 'visible'
        } else {
          UI.style.visibility = 'hidden'
        }
        break
        case 'Tab':
        case 'Escape':
          ipcRenderer.send('pause-game', windowId)
          paused()
        break
       default:
            break
    }
  } else {
              // Enter
    if (event.keyCode === 13 && document.activeElement === chatTextArea) {
      event.preventDefault()
    }
  }
}

function paused () {
    movementInput.up = false
    movementInput.down = false
    movementInput.left = false
    movementInput.right = false
}
window.onkeyup = function (event) {
  if (!hudMode) {
    switch (event.key) {
        case 'w':
        case 'W':
            movementInput.up = false
            break
        case 's':
        case 'S':
            movementInput.down = false
            break
        case 'a':
        case 'A':
            movementInput.left = false
            break
        case 'd':
        case 'D':
            movementInput.right = false
            break
        case 'ArrowUp':
            movementInput.up = false
            break
        case 'ArrowDown':
            movementInput.down = false
            break
        case 'ArrowLeft':
            movementInput.left = false
            break
        case 'ArrowRight':
            movementInput.right = false
            break
        default:
            break
    }
  } else {
    // Enter
    if (event.keyCode === 13 && chatTextArea.value !== '') {
      // socket.emit('newChatMsg', chatTextArea.value);
      chatTextArea.value = ''
      event.preventDefault()
    }
  }
  // Ctrl
  if (event.keyCode === 17) {
    // Turn HUD mode on/off
    hudMode = !hudMode
  }
}

function update (myPlayer, myCamera) {
  let model = myPlayer.GetModel()
  let position = model.position
  let x = position.x
  let y = position.y
  let z = position.z

  if (movementInput.up) {
    // move player
    myPlayer.MoveUp(rotationY)
    myCamera.move(x, z, rotationY, rotationZ)
  }
  if (movementInput.down) {
    // move player
    myPlayer.MoveDown(rotationY)
    myCamera.move(x, z, rotationY, rotationZ)
  }
  if (movementInput.left) {
    // move player
    myPlayer.MoveLeft(rotationY)
    myCamera.move(x, z, rotationY, rotationZ)
  }
  if (movementInput.right) {
    // move player
    myPlayer.MoveRight(rotationY)
    myCamera.move(x, z, rotationY, rotationZ)
  }
  // move camera
  myCamera.move(x, z, rotationY, rotationZ)
  // rotate player
  myPlayer.Rotate(rotationY)
  // rotate camera
  myCamera.rotate(x, y, z, rotationY, rotationZ)
  return 'a'
}

module.exports = {
  update: update
}
