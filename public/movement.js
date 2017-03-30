'use strict'

class Movement {
  constructor () {
    this.rotationX = 0
    this.rotationY = 0
    this.pointAt = {
      x: 1,
      y: 1,
      z: 0
    }
    this.playerAt = {
      x: 0,
      y: 1,
      z: 0
    }
    this.speed = 0.05
    this.movementInput = {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }

  keyDown (window, hudMode) {
    window.onkeyDown = function (event) {
      // Only move the player if the player is not navigating the hud
      if (!hudMode) {
        switch (event.key) {
          case 'w':
            this.movementInput.up = true
            event.preventDefault()
            break
          case 's':
            this.movementInput.down = true
            event.preventDefault()
            break
          case 'a':
            this.movementInput.left = true
            event.preventDefault()
            break
          case 'd':
            this.movementInput.right = true
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
            if (UI.style.visibility === 'hidden') {
              UI.style.visibility = 'visible'
            } else {
              UI.style.visibility = 'hidden'
            }
            break
        }
      } else {
        // Enter
        if (event.keyCode === 13 && document.activeElement === chatTextArea) {
          event.preventDefault()
        }
      }
    }
  }

  keyUp () {
    window.onkeyup = function (event) {
      if (!hudMode) {
        switch (event.key) {
          case 'w':
            this.movementInput.up = false
            event.preventDefault()
            break
          case 's':
            this.movementInput.down = false
            event.preventDefault()
            break
          case 'a':
            this.movementInput.left = false
            event.preventDefault()
            break
          case 'd':
            this.movementInput.right = false
            event.preventDefault()
            break
        }
      } else {
              // Enter
        if (event.keyCode == 13 && chatTextArea.value != '') {
                //   socket.emit('newChatMsg', chatTextArea.value);
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
  }

  mouseMove () {
    window.onmousemove = function (event) {
            // Only move the camera if the player is not navigating the hud
      if (!hudMode) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        this.rotationX -= movementX * -0.002

        if ((rotationZ - movementY * 0.002) >= -1 && (rotationZ - movementY * 0.002) <= 1) {
          rotationZ -= movementY * 0.002
        }

        rotationZ = Math.max(-Math.PI, Math.min(Math.PI, rotationZ))
      }
    }
  }

  mouseMoveDown () {
    window.onmousedown = function (event) {
      requestFullScreen(document.body)
    }
  }

  requestFullScreen (element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen
    if (requestMethod) { // Native full screen.
      requestMethod.call(element)
    // } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
    //   var wscript = new ActiveXObject('WScript.Shell')
    //   if (wscript !== null) {
    //     wscript.SendKeys('{F11}')
    //   }
    // }
    document.body.requestPointerLock()
  }
}
