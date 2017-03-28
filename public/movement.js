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
    this.speed = .05
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
          case "w":
            movementInput.up = true;
            event.preventDefault();
            break;
          case "s":
            movementInput.down = true;
            event.preventDefault();
            break;
          case "a":
            movementInput.left = true;
            event.preventDefault();
            break;
          case "d":
            movementInput.right = true;
            event.preventDefault();
            break;
          case "ArrowUp":
            event.preventDefault();
            break;
          case "ArrowDown":
            event.preventDefault();
            break;
          case "ArrowLeft":
            event.preventDefault();
            break;
          case "ArrowRight":
            event.preventDefault();
            break;
          case " ":
            event.preventDefault();
            break;
          case "h":
            event.preventDefault();
            if (UI.style.visibility == 'hidden') {
              UI.style.visibility = 'visible';
            } else {
              UI.style.visibility = 'hidden';
            }
            break;
        }
      } else {
        // Enter
        if (event.keyCode == 13 && document.activeElement == chatTextArea) {
            event.preventDefault();
        }
      }
    }
  }

  mouseMove () {

  }

  mouseMove () {
    
  }

  requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) { // Native full screen.
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
    document.body.requestPointerLock();
  }
}