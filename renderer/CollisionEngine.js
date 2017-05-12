class CollisionEngine {
  constructor(obj) {
    this.player;
    this.objects = [];
    this.rooms = [];
  }

  AddPlayerBox(obj) {
    this.player = obj;
  }

  AddRoom(obj) {
    this.rooms.push(obj);
  }

  AddRoomObject(obj) {
    this.objects.push(obj);
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

  IsLookingAt(player, item, angle, distance_till_start) {
    // set variables
    let player_position = player.position;
    let player_vector = player.vector;
    let item_position = item.position;

    // calculate the distance the player is from the item
    let dist_x = player_position.x - item_position.x;
    let dist_y = player_position.z - item_position.z;
    let dist_x2 = Math.abs(dist_x) * Math.abs(dist_x);
    let dist_y2 = Math.abs(dist_y) * Math.abs(dist_y);
    let distance_apart = Math.sqrt(dist_x2+dist_y2);

    // calculate items vector (always looking at the player)
    let xv = player_position.x - item_position.x;
    let yv = player_position.y - item_position.y;
    let zv = player_position.z - item_position.z;
    let item_vector = {
      x: xv,
      y: yv,
      z: zv
    };

    // normalize the vectors
    let item_magnitude = Math.sqrt( item_vector.x*item_vector.x +
                                    item_vector.y*item_vector.y +
                                    item_vector.z*item_vector.z);
    item_vector.x = item_vector.x/item_magnitude;
    item_vector.y = item_vector.y/item_magnitude;
    item_vector.z = item_vector.z/item_magnitude;
    let player_magnitude = Math.sqrt( player_vector.x*player_vector.x +
                                      player_vector.y*player_vector.y +
                                      player_vector.z*player_vector.z);
    player_vector.x = player_vector.x/item_magnitude;
    player_vector.y = player_vector.y/item_magnitude;
    player_vector.z = player_vector.z/item_magnitude;

    //check to see if player is looking at item.
    if (distance_apart <= distance_till_start) {
      let dot_product = item_vector.x*-player_vector.x +
                        item_vector.y*player_vector.y +
                        item_vector.z*player_vector.z;
      let cos_angle = dot_product/(item_magnitude*player_magnitude);
      if (cos_angle > angle) {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
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

module.exports = {
	CollisionEngine: CollisionEngine
}
