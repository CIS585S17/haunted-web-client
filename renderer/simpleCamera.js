'use strict'

var view = 'none'
var firstPersonHeight = 1.5;
var thirdPersonHeight = 2;
var depth = 1.5;
var camera;

function getCamera() {
  return camera;
}

function setCamera(myCamera) {
  camera = myCamera;
  if(view == 'firstPerson') {
    camera.position.y = firstPersonHeight
  }
  else if(view == 'thirdPerson') {
    camera.position.y = thirdPersonHeight
  }
}

function setView(viewType) {
  view = viewType;
}

function getView() {
  return view;
}

function move(posX, posZ, rotY, rotZ) {
  if(view == 'firstPerson') {
    camera.position.set(posX, firstPersonHeight, posZ);
  }
  else if(view == 'thirdPerson') {
    let x = -(Math.cos(rotY*Math.PI/180)*depth)+posX;
    let y = -(Math.sin(rotZ*Math.PI/180)*depth)+thirdPersonHeight;
    let z = -(Math.sin(rotY*Math.PI/180)*depth)+posZ;
    camera.position.set(x,y,z);
  }
  else if(view == 'aboveDoor') {
    camera.position.set(3,4,-2);
  }
}

function rotate(playerX, playerY, playerZ, rotY, rotZ) {
  if(view == 'firstPerson') {
    let x = Math.cos(rotY*Math.PI/180) + playerX;
    let y = Math.sin(rotZ*Math.PI/180) + firstPersonHeight;
    let z = Math.sin(rotY*Math.PI/180) + playerZ;
    camera.lookAt(new THREE.Vector3(x,y,z));
  }
  else if(view == 'thirdPerson') {
    camera.lookAt(new THREE.Vector3(playerX,playerY+0.5,playerZ));
  }
  else if(view == 'aboveDoor') {
    camera.lookAt(new THREE.Vector3(playerX,playerY+0.5,playerZ));
  }
}

function windowResize(width, height) {
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
}

module.exports = {
  getCamera: getCamera,
  setCamera: setCamera,
  setView: setView,
  getView: getView,
  move: move,
  rotate: rotate,
  windowResize: windowResize
}
