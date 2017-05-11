'use strict'

var rotationY = 0;

var rotationZ = 0;

let movementInput = {
  up: false,
  down: false,
  left: false,
  right: false,
}

let noMovementXZ = true;

let jump = false;

let hudMode = false

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
  document.body.requestPointerLock();
}
window.onkeydown = function (event) {
          // Only move the player if the player is not navigating the hud
  if (!hudMode) {
    switch (event.key) {
      case 'w':
        noMovementXZ = false
        movementInput.up = true
        event.preventDefault()
        break
      case 's':
        noMovementXZ = false
        movementInput.down = true
        event.preventDefault()
        break
      case 'a':
        noMovementXZ = false
        movementInput.left = true
        event.preventDefault()
        break
      case 'd':
        noMovementXZ = false
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
        jump = true;
        event.preventDefault()
        break

      case 'h':
        event.preventDefault()
        if (UI.style.visibility == 'hidden') { UI.style.visibility = 'visible' } else { UI.style.visibility = 'hidden' }
        break

      default:
        noMovementXZ = false
        break

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
        noMovementXZ = true
        movementInput.up = false
        event.preventDefault()
        break
      case 's':
        noMovementXZ = true
        movementInput.down = false
        event.preventDefault()
        break
      case 'a':
        noMovementXZ = true
        movementInput.left = false
        event.preventDefault()
        break
      case 'd':
        noMovementXZ = true
        movementInput.right = false
        event.preventDefault()
        break
      case ' ':
        jump = false
        event.preventDefault()
        break
      /*default:
        noMovementXZ = false
        break*/
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

function update(myPlayer, myCamera) {

  let model = myPlayer.GetModel();
  let position = model.position;
  let x = position.x;
  let y = position.y;
  let z = position.z;
  if(noMovementXZ) {
    myPlayer.NoMoveXZ();
  }
  if(movementInput.up) {
    //move player
    myPlayer.MoveUp(rotationY);
    myCamera.move(x, z, rotationY, rotationZ);
  }
  if(movementInput.down) {
    //move player
    myPlayer.MoveDown(rotationY);
    myCamera.move(x, z, rotationY, rotationZ);
  }
  if(movementInput.left) {
    if(myCamera.getView() === 'aboveDoor') {
      rotationY -= 1.5;
    }
    else {
      //move player
      myPlayer.MoveLeft(rotationY);
      myCamera.move(x, z, rotationY, rotationZ);
    }
  }
  if(movementInput.right) {
    if(myCamera.getView() === 'aboveDoor') {
      rotationY += 1.5;
    }
    else {
      //move player
      myPlayer.MoveRight(rotationY);
      myCamera.move(x, z, rotationY, rotationZ);
    }
  }
  if(jump) {
    myPlayer.Jump();
  }
  //move camera
  myCamera.move(x, z, rotationY, rotationZ);
  //rotate player
  myPlayer.Rotate(rotationY);
  //rotate camera
  myCamera.rotate(x, y, z, rotationY, rotationZ);
  //return 'a';
  //update player
  myPlayer.Update();
}

module.exports = {
  update: update
}