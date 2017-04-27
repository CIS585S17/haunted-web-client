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

  // triangle = {p1, p2, p3}
  // p1, p2, p3 = {x, y, z}
  CalculateTriangleNormal(triangle) {
    let Ux = triangle.p2.x - triangle.p1.x;
    let Uy = triangle.p2.y - triangle.p1.y;
    let Uz = triangle.p2.z - triangle.p1.z;
    let Vx = triangle.p3.x - triangle.p1.x;
    let Vy = triangle.p3.y - triangle.p1.y;
    let Vz = triangle.p3.z - triangle.p1.z;
    let Nx = Uz*Vy - Uy*Vz;
    let Ny = Ux*Vz - Uz*Vx;
    let Nz = Uy*Vx - Ux*Vy;
    return {x:Nx, y:Ny, z:Nz};
  }

  PlayerColliding(player, view, model) {
    if(view == 'firstPerson') {
      this.objects.forEach( function(obj) {
        if((player.minX - 1) <= obj.minX) {
          model.position.x = obj.minX+1.5;
          console.log('outside of box');
        }
        else if((player.maxX + 1) >= obj.maxX) {
          console.log('outside of box');
        }
        else if((player.minZ - 1) <= obj.minZ) {
          console.log('outside of box');
        }
        else if((player.maxZ + 1) >= obj.maxZ) {
          console.log('outside of box');
        }
      });
    }
    else if(view == 'thirdPerson') {
      this.objects.forEach( function(obj) {
        if(!(player.minX <= obj.maxX && player.minX >= obj.minX)) {
          console.log('outside of box');
        }
        else if(!(player.maxX <= obj.maxX && player.maxX >= obj.minX)) {
          console.log('outside of box');
        }
        else if(!(player.minZ <= obj.maxZ && player.minZ >= obj.minZ)) {
          console.log('outside of box');
        }
        else if(!(player.maxZ <= obj.maxZ && player.maxZ >= obj.minZ)) {
          console.log('outside of box');
        }
      });
    }
  }
}

module.exports = {
	CollisionEngine: CollisionEngine
}