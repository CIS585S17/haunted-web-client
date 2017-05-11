class CollisionEngine {
  constructor(obj) {
    this.player;
    this.objects = [];
    this.rooms = [];
  }

  AddPlayerBox(obj) {
    this.player = obj;
  }

  AddPlayerSphere(obj) {
    //get players dimensions
    //return {x: 0, y: 0, z: 0, radius: 0}

  }

  AddRoom(obj) {
    this.rooms.push(obj);
  }

  AddRoomObject(obj) {
    this.objects.push(obj);
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
    let Nx = -(Uz*Vy - Uy*Vz);
    let Ny = -(Ux*Vz - Uz*Vx);
    let Nz = -(Uy*Vx - Ux*Vy);
    let Nmag = Math.sqrt(Nx*Nx + Ny*Ny + Nz*Nz);
    Nx = Nx/Nmag;
    Ny = Ny/Nmag;
    Nz = Nz/Nmag;
    return {x:Nx, y:Ny, z:Nz};
  }

  DistanceFrom(obj1, obj2) {
    let x = obj1.position.x - obj2.position.x;
    let y = obj1.position.z - obj2.position.z;
    let x2 = Math.abs(x) * Math.abs(x);
    let y2 = Math.abs(y) * Math.abs(y);
    return Math.sqrt(x2+y2);
  }

  //will produce a vector with item1 looking at item2
  LookAt(item1, item2) {
    let xv = item2.position.x - item1.position.x;
    let yv = item2.position.y - item1.position.y;
    let zv = item2.position.z - item1.position.z;
    return {
      x: xv,
      y: yv,
      z: zv
    };
    //return the proper vector
  }

  Normal(vec) {
    let n = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
    return {
      x: vec.x/n,
      y: vec.y/n,
      z: vec.z/n
    }
  }

  LookingAt(obj_one_vector, obj_two_vector, difference, distance, close) {
    //Make Item Vector Pointing At Player!!!!!!!!
    if (distance <= close) {
      //item
      let u = obj_one_vector;
      //player
      let v = obj_two_vector;
      let dot_product = u.x*-v.x + u.y*v.y + u.z*v.z;
      let u_mag = Math.sqrt(u.x*u.x + u.y*u.y + u.z*u.z);
      let v_mag = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
      let cos_angle = dot_product/(u_mag*v_mag);
      //cos_angle is 0 perpendicular
      //console.log(cos_angle);
      if (cos_angle > .9){
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  PlayerColliding(player, view, model) {
    this.objects.forEach(function(obj) {
      if(view === 'firstPerson') {

      }
      else if(view === 'thirdPerson' || view === 'aboveDoor') {
        if(player.minX <= obj.maxX && player.minX >= obj.minX) { //and moving to the left
          if (player.maxZ >= obj.minZ && player.maxZ <= obj.maxZ) {
            model.position.x = obj.maxX + 0.3;
          }
          else if (player.minZ >= obj.minZ && player.minZ <= obj.maxZ) {
            model.position.x = obj.maxX + 0.3;
          }
          else if (model.position.z >= obj.minZ && model.position.z <= obj.maxZ) {
            model.position.x = obj.maxX + 0.3;
          }
        }
        else if(player.maxX >= obj.minX && player.maxX <= obj.maxX) { //and moving to the right
          if (player.maxZ >= obj.minZ && player.maxZ <= obj.maxZ) {
            model.position.x = obj.minX - 0.3;
          }
          else if (player.minZ >= obj.minZ && player.minZ <= obj.maxZ) {
            model.position.x = obj.minX - 0.3;
          }
          else if (model.position.z >= obj.minZ && model.position.z <= obj.maxZ) {
            model.position.x = obj.minX - 0.3;
          }
        }
        else if(player.minZ <= obj.maxZ && player.minZ >= obj.minZ) { //and moving up
          if (player.maxX >= obj.minX && player.maxX <= obj.maxX) {
            model.position.z = obj.maxZ + 0.3;
          }
          else if (player.minX >= obj.minX && player.minX <= obj.maxX) {
            model.position.z = obj.maxZ + 0.3;
          }
          else if (model.position.x >= obj.minX && model.position.x <= obj.maxX) {
            model.position.z = obj.maxZ + 0.3;
          }
        }
        else if(player.maxZ >= obj.minZ && player.maxZ <= obj.maxZ) { //and moving down
          if (player.maxX >= obj.minX && player.maxX <= obj.maxX) {
            model.position.z = obj.minZ - 0.3;
          }
          else if (player.minX >= obj.minX && player.minX <= obj.maxX) {
            model.position.z = obj.minZ - 0.3;
          }
          else if (model.position.x >= obj.minX && model.position.x <= obj.maxX) {
            model.position.z = obj.minZ - 0.3;
          }
        }
      }
    });

    this.rooms.forEach(function(room) {
      if(view === 'firstPerson') {
        if((player.minX - .925) <= room.minX) {
          model.position.x = room.minX+1.225;
        }
        if((player.maxX + .925) >= room.maxX) {
          model.position.x = room.maxX-1.225;
        }
        if((player.minZ - .925) <= room.minZ) {
          model.position.z = room.minZ+1.225;
        }
        if((player.maxZ + .925) >= room.maxZ) {
          model.position.z = room.maxZ-1.225;
        }
      }
      else if(view === 'thirdPerson' || view === 'aboveDoor') {
        if((player.minX - .1) <= room.minX) {
          model.position.x = room.minX+.4;
        }
        if((player.maxX + .1) >= room.maxX) {
          model.position.x = room.maxX-.4;
        }
        if((player.minZ - .1) <= room.minZ) {
          model.position.z = room.minZ+.4;
        }
        if((player.maxZ + .1) >= room.maxZ) {
          model.position.z = room.maxZ-.4;
        }
      }
    });
  }
}

  /*PlayerColliding(player, view, model) {
    if(view === 'firstPerson') {
      this.objects.forEach( function(obj) {
        if((player.minX - .925) <= obj.minX) {
          model.position.x = obj.minX+1.225;
        }
        if((player.maxX + .925) >= obj.maxX) {
          model.position.x = obj.maxX-1.225;
        }
        if((player.minZ - .925) <= obj.minZ) {
          model.position.z = obj.minZ+1.225;
        }
        if((player.maxZ + .925) >= obj.maxZ) {
          model.position.z = obj.maxZ-1.225;
        }
      });
    }
    else if(view === 'thirdPerson' || view === 'aboveDoor') {
      this.objects.forEach( function(obj) {
        if((player.minX - .25) <= obj.minX) {
          model.position.x = obj.minX+.55;
        }
        if((player.maxX + .25) >= obj.maxX) {
          model.position.x = obj.maxX-.55;
        }
        if((player.minZ - .25) <= obj.minZ) {
          model.position.z = obj.minZ+.55;
        }
        if((player.maxZ + .25) >= obj.maxZ) {
          model.position.z = obj.maxZ-.55;
        }
      });
    }
  }*/


module.exports = {
	CollisionEngine: CollisionEngine
}
