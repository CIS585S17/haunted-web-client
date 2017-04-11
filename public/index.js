'use strict'
const {ipcRenderer} = require('electron')


let index
let rotationX = 0
let rotationZ = 0
let pointAt = {
  x: 1,
  y: 1,
  z: 0
}
let playerAt = {
  x: 0,
  y: 1,
  z: 0
}
let speed = 0.05
let movementInput = {
  up: false,
  down: false,
  left: false,
  right: false
}
let hudMode = false

ipcRenderer.on('load', (event, i) => {
  index = i
  console.log('index', index)
})

window.onmousemove = function (event) {
  // Only move the camera if the player is not navigating the hud
  if (!hudMode) {
    let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    rotationX -= movementX * -0.002
    if ((rotationZ - movementY * 0.002) >= -1 && (rotationZ - movementY * 0.002) <= 1) {
      rotationZ -= movementY * 0.002
    }
    rotationZ = Math.max(-Math.PI, Math.min(Math.PI, rotationZ))
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
        movementInput.up = true
        event.preventDefault()
        break
      case 's':
        movementInput.down = true
        event.preventDefault()
        break
      case 'a':
        movementInput.left = true
        event.preventDefault()
        break
      case 'd':
        movementInput.right = true
        event.preventDefault()
        break
      case 'ArrowUp':
        event.preventDefault()
        break
      case 'ArrowDown':
        event.preventDefault()
        break
      case 'ArrowLeft':
        event.preventDefault()
        break
      case 'ArrowRight':
        event.preventDefault()
        break
      case ' ':
        event.preventDefault()
        break
      case 'h':
        event.preventDefault()
        if (UI.style.visibility == 'hidden') { UI.style.visibility = 'visible' } else { UI.style.visibility = 'hidden' }
        break
      case 'Tab':
        event.preventDefault()
        ipcRenderer.send('pause-game', 0)
    }
  } else {
              // Enter
    if (event.keyCode == 13 && document.activeElement == chatTextArea) {
      event.preventDefault()
    }
  }
}
window.onkeyup = function (event) {
  if (!hudMode) {
    switch (event.key) {
      case 'w':
        movementInput.up = false
        event.preventDefault()
        break
      case 's':
        movementInput.down = false
        event.preventDefault()
        break
      case 'a':
        movementInput.left = false
        event.preventDefault()
        break
      case 'd':
        movementInput.right = false
        event.preventDefault()
        break
    }
  } else {
    // Enter
    if (event.keyCode == 13 && chatTextArea.value != '') {
      // socket.emit('newChatMsg', chatTextArea.value);
      chatTextArea.value = ''
      event.preventDefault()
    }
  }
  // Ctrl
  if (event.keyCode == 17) {
    // Turn HUD mode on/off
    hudMode = !hudMode
  }
}

function render (camera) {
  if (movementInput.left) {
    playerAt.x -= Math.cos(rotationX + Math.PI / 2) * speed
    playerAt.z -= Math.sin(rotationX + Math.PI / 2) * speed
  }
  if (movementInput.right) {
    playerAt.x += Math.cos(rotationX + Math.PI / 2) * speed
    playerAt.z += Math.sin(rotationX + Math.PI / 2) * speed
  }
  if (movementInput.up) {
    playerAt.x += Math.cos(rotationX) * speed
    playerAt.z += Math.sin(rotationX) * speed
  }
  if (movementInput.down) {
    playerAt.x -= Math.cos(rotationX) * speed
    playerAt.z -= Math.sin(rotationX) * speed
  }
  camera.position.x = playerAt.x
  camera.position.y = playerAt.y
  camera.position.z = playerAt.z
  pointAt.x = Math.cos(rotationX) + playerAt.x
  pointAt.y = Math.sin(rotationZ) + playerAt.y
  pointAt.z = Math.sin(rotationX) + playerAt.z
  camera.lookAt(pointAt)
}

module.exports = {
  render: render,
  playerAt: playerAt
}
