class CollisionEngine {
  constructor(obj) {
    this.player;
    this.objects = [];
  }

  AddPlayerBox(obj) {
    this.player = obj;
  }

  AddPlayerSphere(obj) {
    //get players dimensions
    //return {x: 0, y: 0, z: 0, radius: 0}

  }

  AddRoom(obj) {
    this.objects.push(obj);
  }

  AddRoomObject(obj) {
    //get object dimensions
  }



  IntersectPlayerBoxVsBox(box, obj) {

    return  (box.minX <= obj.maxX && box.maxX >= obj.minX) &&
            (box.minY <= obj.maxY && box.maxY >= obj.minY) &&
            (box.minZ <= obj.maxZ && box.maxZ >= obj.minZ);

  }

  IntersectPlayerSphereVsBox(sphere, box) {
    var x = Math.max(box.minX, Math.min(sphere.x, box.maxX));
    var y = Math.max(box.minY, Math.min(sphere.y, box.maxY));
    var z = Math.max(box.minZ, Math.min(sphere.z, box.maxZ));

    var distance = Math.sqrt((x - sphere.x) * (x - sphere.x) +
                             (y - sphere.y) * (y - sphere.y) +
                             (z - sphere.z) * (z - sphere.z));

    return distance < sphere.radius;
  }

  PlayerColliding(player) {
    this.objects.forEach( function(obj) {



      if((player.minX <= obj.maxX && player.maxX >= obj.minX) &&
              (player.minY <= obj.maxY && player.maxY >= obj.minY) &&
              (player.minZ <= obj.maxZ && player.maxZ >= obj.minZ)) {
                console.log('collided');
              }





      //console.log(obj);
      /*if( IntersectPlayerBoxVsBox(this.player, obj) ) {
        //collided
        console.log('collision');
      }
      else {
        //no collision
      }*/
    });
  }
}

module.exports = {
	CollisionEngine: CollisionEngine
}
