'use strict'
const THREE = require('./js/three.js')
const Animation = require('./js/collada/Animation.js')
const KeyFrameAnimation = require('./js/collada/AnimationHandler.js')
const ColladaLoader = require('./js/ColladaLoader.js')
const Detector = require('./js/Detector.js')
const Stats = require('./js/stats.min.js')
const {HUD} = require('./js/hud.js')
const UI = require('./js/UI.js')
// {/*<script src="js/collada/Animation.js"></script>*/}
// {/*<script src="js/collada/AnimationHandler.js"></script>*/}
// {/*<script src="js/collada/KeyFrameAnimation.js"></script>*/}

// {/*<script src="js/ColladaLoader.js"></script>*/}

// {/*<script src="js/Detector.js"></script>*/}
// {/*<script src="js/stats.min.js"></script>*/}
// {/*<script src="js/hud.js"></script>*/}
// {/*<script src="js/character.js"></script>*/}
// {/*<script src="js/UI.js"></script>*/}

window.onload = function () {
  let startButton = document.getElementById('startButton')
  startButton.addEventListener('click', (event) => {
    start()
  })
  function start () {
    document.getElementById('startButton').style.visibility = 'hidden'
    //   var socket = io.connect('/');
    console.log('i am here')
    var playerHUD = new HUD()
    var hudMode = false
    // var UI = getCanvasElement(); UI.style.visibility = 'hidden'
    var rotationX = 0
    var rotationZ = 0
    var pointAt = {
      x: 1,
      y: 1,
      z: 0
    }
    var playerAt = {
      x: 0,
      y: 1,
      z: 0
    }
    var speed = 0.05
    var movementInput = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    function requestFullScreen (element) {
          // Supports most browsers and their versions.
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen

      if (requestMethod) { // Native full screen.
        requestMethod.call(element)
      } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
      document.body.requestPointerLock()
    }

    var elem = document.body // Make the body go full screen.
    requestFullScreen(elem)

    // window.onmousemove = function (event) {
    //         // Only move the camera if the player is not navigating the hud
    //   if (!hudMode) {
    //     var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    //     var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    //     rotationX -= movementX * -0.002

    //     if ((rotationZ - movementY * 0.002) >= -1 && (rotationZ - movementY * 0.002) <= 1) {
    //       rotationZ -= movementY * 0.002
    //     }

    //     rotationZ = Math.max(-Math.PI, Math.min(Math.PI, rotationZ))
    //   }
    // }

    // window.onmousedown = function (event) {
    //   requestFullScreen(document.body)
    // }

    // window.onkeydown = function (event) {
    //       // Only move the player if the player is not navigating the hud
    //   if (!hudMode) {
    //     switch (event.key) {
    //       case 'w':
    //         movementInput.up = true
    //         event.preventDefault()
    //         break
    //       case 's':
    //         movementInput.down = true
    //         event.preventDefault()
    //         break
    //       case 'a':
    //         movementInput.left = true
    //         event.preventDefault()
    //         break
    //       case 'd':
    //         movementInput.right = true
    //         event.preventDefault()
    //         break
    //       case 'ArrowUp':
    //         event.preventDefault()
    //         break
    //       case 'ArrowDown':
    //         event.preventDefault()
    //         break
    //       case 'ArrowLeft':
    //         event.preventDefault()
    //         break
    //       case 'ArrowRight':
    //         event.preventDefault()
    //         break
    //       case ' ':
    //         event.preventDefault()
    //         break

    //       case 'h':
    //         event.preventDefault()
    //         if (UI.style.visibility == 'hidden') { UI.style.visibility = 'visible' }					  else						{ UI.style.visibility = 'hidden' }
    //         break
    //     }
    //   } else {
    //           // Enter
    //     if (event.keyCode == 13 && document.activeElement == chatTextArea) {
    //       event.preventDefault()
    //     }
    //   }
    // }
    // window.onkeyup = function (event) {
    //   if (!hudMode) {
    //     switch (event.key) {
    //       case 'w':
    //         movementInput.up = false
    //         event.preventDefault()
    //         break
    //       case 's':
    //         movementInput.down = false
    //         event.preventDefault()
    //         break
    //       case 'a':
    //         movementInput.left = false
    //         event.preventDefault()
    //         break
    //       case 'd':
    //         movementInput.right = false
    //         event.preventDefault()
    //         break
    //     }
    //   } else {
    //           // Enter
    //     if (event.keyCode == 13 && chatTextArea.value != '') {
    //             //   socket.emit('newChatMsg', chatTextArea.value);
    //       chatTextArea.value = ''
    //       event.preventDefault()
    //     }
    //   }
    //       // Ctrl
    //   if (event.keyCode == 17) {
    //           // Turn HUD mode on/off
    //     hudMode = !hudMode
    //   }
    // }

      // Handle incoming chat messages
    //   socket.on('updateChatLog', function (msg) {
    //       playerHUD.addChatMsg(msg);
    //   });

    if (!Detector.webgl) {
      Detector.addGetWebGLMessage()
    }
    var container, stats
    var camera, scene, renderer, objects
    var particleLight
    var dae
    init()

    load('models/library_room.dae', 5, 0, 0)
                // load( 'models/room.dae', 0, 0, 0);
                // load( 'models/cardroom.dae', 0, 0, 10);

    function load (ObjectPath, X, Y, Z) {
      var loader = new ColladaLoader()
      loader.options.convertUpAxis = true

      loader.load(ObjectPath, function (collada) {
        dae = collada.scene
        dae.position.set(X, Y, Z)
        scene.add(dae)
        dae.scale.x = dae.scale.y = dae.scale.z = 0.02
        dae.updateMatrix()
        animate()
      })
    }

    function init () {
      container = document.createElement('div')
      document.body.appendChild(container)
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
      camera.position.set(0, 1, 0)
      scene = new THREE.Scene()

              // Grid
      var size = 14, step = 1
      var geometry = new THREE.Geometry()
      var material = new THREE.LineBasicMaterial({ color: 0x303030 })

      for (var i = -size; i <= size; i += step) {
        geometry.vertices.push(new THREE.Vector3(-size, -0.04, i))
        geometry.vertices.push(new THREE.Vector3(size, -0.04, i))
        geometry.vertices.push(new THREE.Vector3(i, -0.04, -size))
        geometry.vertices.push(new THREE.Vector3(i, -0.04, size))
      }

      var line = new THREE.LineSegments(geometry, material)
      scene.add(line)
              // Add the COLLADA
              // scene.add( dae );
              // scene.add( dae2 );
              // particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
              // scene.add( particleLight );
              // Lights
      scene.add(new THREE.AmbientLight(0xcccccc))
      var directionalLight = new THREE.DirectionalLight(/* Math.random() * 0xffffff */0xeeeeee)
      directionalLight.position.x = Math.random() - 0.5
      directionalLight.position.y = Math.random() - 0.5
      directionalLight.position.z = Math.random() - 0.5
      directionalLight.position.normalize()
      scene.add(directionalLight)
          //	var pointLight = new THREE.PointLight( 0xffffff, 4 );
          //	particleLight.add( pointLight );
      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)
      stats = new Stats()
      container.appendChild(stats.dom)
      // container.appendChild(UI)

      window.addEventListener('resize', onWindowResize, false)
    }

    function onWindowResize () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate () {
      requestAnimationFrame(animate)
      update()
      render()
      stats.update()
    }

    var clock = new THREE.Clock()

    function update () {
      playerHUD.update(hudMode)
    }

    function render () {
      var timer = Date.now() * 0.0005

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
              // particleLight.position.x = Math.sin( timer * 4 ) * 3009;
              // particleLight.position.y = Math.cos( timer * 5 ) * 4000;
              // particleLight.position.z = Math.cos( timer * 4 ) * 3009;
      THREE.AnimationHandler.update(clock.getDelta())
      renderer.render(scene, camera)
    }
  }
}
