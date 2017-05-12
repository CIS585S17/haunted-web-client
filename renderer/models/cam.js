'use strict'

//Camera Class
class cam {
  //Set up variables
  constructor() {
  }

  static Update(playerPosition,playerRotation,playerView,camera) {
    //update camera in first person
    if(playerView == 'firstPerson')
    {
      //update position
      let position = playerPosition
      position[1] = 1
      camera.position.set(position)
      //update rotation
      let rotation = playerRotation + playerPosition
      camera.rotation.set(rotation)
    }
    //update camera in third person
    else if(playerView == 'thirdPerson')
    {
      //set how far away camera is from the player
      let depth = 2
      //update position
      let x = -playerRotation.x*depth+playerPosition.x
      let y = -playerRotation.y*depth+playerPosition.y+1
      let z = -playerRotation.z*depth+playerPosition.z
      console.log('x:' + x + ' y:' + y + ' z:' + z)
      camera.position.set(x,y,z)
      //update rotation
      //let rotation = playerRotation
      console.log('rotX:' + playerRotation.x + ' rotY:' playerRotation.y + ' rotZ:' + playerRotation.z)
      camera.rotation.set(rotation)
    }
  }
}

module.exports = {
  cam: cam
}
