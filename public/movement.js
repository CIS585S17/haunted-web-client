'use strict'

class Movement {
  constructor () {
    this._rotationX = 0
    this._rotationZ = 0
    this._pointAtX = 1
    this._pointAtY = 1
    this._pointAtZ = 0
    this.pointAt = {
      x: 1,
      y: 1,
      z: 0
    }
    this._playerAtX = 0
    this._playerAtY = 1
    this._playerAtZ = 0
    this.playerAt = {
      x: 0,
      y: 1,
      z: 0
    }
    this._speed = 0.05
    this._up = false
    this._down = false
    this._left = false
    this._right = false
    this.movementInput = {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }

  keyDown (hudMode) {
    console.log('keyDown')
    window.onkeydown = function (event) {
      // Only move the player if the player is not navigating the hud
      console.log(this._up)
      if (!hudMode) {
        console.log('keyDown', event.key)
        switch (event.key) {
          case 'w':
            this._up = true
            event.preventDefault()
            break
          case 's':
            this._down = true
            event.preventDefault()
            break
          case 'a':
            this._left = true
            event.preventDefault()
            break
          case 'd':
            this._right = true
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

  keyUp (hudMode) {
    console.log('keyUp')
    window.onkeyup = function (event) {
      if (!hudMode) {
        console.log('keyUp', event.key)
        switch (event.key) {
          case 'w':
            this._up = false
            event.preventDefault()
            break
          case 's':
            this._down = false
            event.preventDefault()
            break
          case 'a':
            this._left = false
            event.preventDefault()
            break
          case 'd':
            this._right = false
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

  mouseMove (hudMode) {
    window.onmousemove = function (event) {
            // Only move the camera if the player is not navigating the hud
      if (!hudMode) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        this._rotationX -= movementX * -0.002

        if ((this._rotationZ - movementY * 0.002) >= -1 && (this._rotationZ - movementY * 0.002) <= 1) {
          this._rotationZ -= movementY * 0.002
        }

        this._rotationZ = Math.max(-Math.PI, Math.min(Math.PI, this._rotationZ))
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
    }
    document.body.requestPointerLock()
  }

  render (camera) {
    console.log('render', this._left, this._right, this._up, this._down)
    let timer = Date.now() * 0.0005
    if (this._left) {
      console.log('left')
      this._playerAtX -= Math.cos(this._rotationX + Math.PI / 2) * this._speed
      this.playerAtZ -= Math.sin(this._rotationX + Math.PI / 2) * this._speed
      console.log(this._playerAtX, this._playerAtZ)
    }
    if (this._right) {
      this._playerAtX += Math.cos(this._rotationX + Math.PI / 2) * this._speed
      this._playerAtZ += Math.sin(this._rotationX + Math.PI / 2) * this._speed
    }
    if (this._up) {
      this._playerAtX += Math.cos(this._rotationX) * this._speed
      this._playerAtZ += Math.sin(this._rotationX) * this._speed
    }
    if (this._down) {
      this._playerAtX -= Math.cos(this._rotationX) * this._speed
      this._playerAtZ -= Math.sin(this._rotationX) * this._speed
    }
    camera.position.x = this._playerAtX
    camera.position.y = this._playerAtY
    camera.position.z = this._playerAtZ
    this._pointAtX = Math.cos(this._rotationX) + this._playerAtX
    this._pointAtY = Math.sin(this._rotationZ) + this._playerAtY
    this._pointAtZ = Math.sin(this._rotationX) + this._playerAtZ
    camera.lookAt({
      x: this._pointAtX,
      y: this._pointAtY,
      z: this._pointAtZ
    })
    // console.log({
    //   x: this._pointAtX,
    //   y: this._pointAtY,
    //   z: this._pointAtZ
    // })
  }
}

module.exports = {
  Movement: Movement
}
