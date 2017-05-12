'use strict'
const {ipcRenderer} = require('electron')
var rotationY = 0

var rotationZ = 0

let movementInput = {
  up: false,
  down: false,
  left: false,
  right: false
}

let noMovementXZ = true

let jump = false

let hudMode = false
let windowId

ipcRenderer.on('load', (event, data) => {
  windowId = data.id
  //let playerHUD = new HUD()

  //playerHUD.addChatMsg(ipcRenderer.sendSync('update-chat-log', 'get message'))
  ipcRenderer.on('un-pause', (paused) => {
      // TODO: unpause the game when paused is false
  })
})

function paused () {
  movementInput.up = false
  movementInput.down = false
  movementInput.left = false
  movementInput.right = false
}

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
          // Only move the player if the player is not navigating the hud
  if (!hudMode) {
    switch (event.key) {
      case 'w':
	  case 'W':
	  case 'ArrowUp':
        noMovementXZ = false
        movementInput.up = true
        break
      case 's':
	  case 'S':
	  case 'ArrowDown':
        noMovementXZ = false
        movementInput.down = true
        break
      case 'a':
	  case 'A':
	  case 'ArrowLeft':
        noMovementXZ = false
        movementInput.left = true
        break
      case 'd':
	  case 'D':
	  case 'ArrowRight':
        noMovementXZ = false
        movementInput.right = true
        break
      case ' ':
        jump = true
        break
      case 'h':
	  case 'H':
	  //Throws a non-fatal error
        if (UI.style.visibility === 'hidden') { UI.style.visibility = 'visible' } else { UI.style.visibility = 'hidden' }
        break
      case 'Tab':
	  case 'Escape':
        ipcRenderer.send('pause-game', windowId)
        paused()
        break
      default:
        noMovementXZ = false
        break
	}
  }
	else {
			  // Enter
	if (event.keyCode == 13 && document.activeElement === chatTextArea) {
	  event.preventDefault()
	}
  }
}
window.onkeyup = function (event) {
  if (!hudMode) {
    switch (event.key) {
      case 'w':
	  case 'W':
	  case 'ArrowUp':
        noMovementXZ = true
        movementInput.up = false
        break
      case 's':
	  case 'S':
	  case 'ArrowDown':
        noMovementXZ = true
        movementInput.down = false
        break
      case 'a':
	  case 'A':
	  case 'ArrowLeft':
        noMovementXZ = true
        movementInput.left = false
        break
      case 'd':
	  case 'D':
	  case 'ArrowRight':
        noMovementXZ = true
        movementInput.right = false
        break
      case ' ':
        jump = false
        break
	default:
        //noMovementXZ = false
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
	//Cursor is still hidden
    hudMode = !hudMode
  }
}

function update (myPlayer, myCamera) {
  let model = myPlayer.GetModel()
  let position = model.position
  let x = position.x
  let y = position.y
  let z = position.z
  if (noMovementXZ) {
    myPlayer.NoMoveXZ()
  }
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
    if (myCamera.getView() === 'aboveDoor') {
      rotationY -= 1.5
    } else {
      // move player
      myPlayer.MoveLeft(rotationY)
      myCamera.move(x, z, rotationY, rotationZ)
    }
  }
  if (movementInput.right) {
    if (myCamera.getView() === 'aboveDoor') {
      rotationY += 1.5
    } else {
      // move player
      myPlayer.MoveRight(rotationY)
      myCamera.move(x, z, rotationY, rotationZ)
    }
  }
  if (jump) {
    myPlayer.Jump()
  }
  // move camera
  myCamera.move(x, z, rotationY, rotationZ)
  // rotate player
  myPlayer.Rotate(rotationY)
  // rotate camera
  myCamera.rotate(x, y, z, rotationY, rotationZ)
  // return 'a';
  // update player
  myPlayer.Update()
}

module.exports = {
  update: update
}
