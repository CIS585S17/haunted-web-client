'use strict'
const fs = require('fs')

/**
 * A room in the house
 */
class Room {
    /**
     * Create a room that stores what players are in the room,
     * what items are in the room, the name and file path of the room,
     * what other rooms it is connected to and if it has been explored yet.
     * @constructor
     *
     * @param {string} name The name of the file to be stored
     * @param {string} path The path of the file of the room
     */
  constructor (name, path) {
    this.edges = []
    this.explored = false
    this.items = []
    this.name = name
    this.path = path
    this.players = []
  }

    /**
     * Add connection between rooms
     * @param {Edge} edge The connction between two rooms
     */
  addEdge (edge) {
    let hasEdge = false
    for (let e of this.edges) {
      if (e.room === edge.room) {
        hasEdge = true
      }
    }
    if (!hasEdge) {
      this.edges.push(edge)
    }
  }

    /**
     * Add an Item to the room
     * @param {Item} item The item to be added to this room
     */
  addItem (item) {
    this.items.push(item)
  }

    /**
     * Add player to room
     * @param {Player} player The player to be added to this room
     */
  addPlayer (player) {
    this.players.push(player)
  }

    /**
     * The connection to be removed between two rooms
     * @param {Edge} edge
     */
  removeEdge (room) {
        // let index = this.edges.indexOf(edge);
    let index = this.edges.findIndex(function (edge) {
      return edge.room = room
    })
    this.edges.splice(index, 1)
  }

    /**
     * Remove an item from the room
     * @param {Item} item The item to be removed from this room
     */
  removeItem (item) {
    let index = this.items.indexOf(item)
    this.items.splice(index, 1)
  }

    /**
     * Remove player from room
     * @param {Player} player The player to be removed from this room
     */
  removePlayer (player) {
    let index = this.players.indexOf(player)
    if (index !== -1) {
      this.players.splice(index, 1)
    }
  }
}

/**
 * Edges between nodes/rooms
 */
class Edge {
    /**
     * Create an Edge to a room
     * @constructor
     * @param {Room} room The room to create edge to
     */
  constructor (room) {
    this.room = room
  }
}

/**
 * Graph for rooms of a house
 * Where each node is a room
 * and edges connect rooms
 */
class RoomGraph {
    /**
     *
     * @param {*} dir The location of the dae files
     */
  constructor (dir) {
    this.dir = dir
    this.rooms = []
  }

    /**
     * Getter to get array of rooms
     */
  room () {
    for (let room of this.rooms) {
      console.log(room)
    }
  }

    /**
     * Add the edge only from room1 to room2
     * @param {Room} room1 A room in the house/graph
     * @param {Room} room2 A room in the house/graph
     */
  addEdge (room1, room2) {
        // Check if Edge alredy exits between room1 and room2
    room1.addEdge(new Edge(room2))
  }

    /**
     * Add eges from room1 to room2 and from room2 to room1
     * @param {Room} room1 A room in the house/graph
     * @param {Room} room2 A room in the house/graph
     */
  addEdges (room1, room2) {
    room1.addEdge(new Edge(room2))
    room2.addEdge(new Edge(room1))
  }

    /**
     * Add an item to a room
     * @param {Item} item An item to be added to a room in the house/graph
     * @param {Room} room A room in the house/graph
     */
  addItem (item, room) {
    room.addItem(item)
  }

    /**
     * Add the Foyer as the first room in the house/graph
     */
  createFoyer () {
    this.rooms.push(new Room('foyer', `${this.dir}/foyer.dae`))
  }

    /**
     * Create the rooms by loading in all dae files
     */
  createRoom () {
    try {
      let files = fs.readdirSync(this.dir)
      for (let file of files) {
        if (file.endsWith('.dae') && file != 'foyer.dae') {
          this.rooms.push(new Room(file.substr(0, file.length - 4), `${this.dir}/${file}`))
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

    /**
     * Adds player to a room
     * @param {Player} player A player in the game to be added to a room
     * @param {Room} room A room in the house/graph
     */
  addPlayer (player, room) {
    let index = this.rooms.indexOf(room)
    if (index !== -1) {
      room.addPlayer(player)
    } else {
            // throw new ReferenceError;
    }
  }

    /**
     * Remove edge from room1 to room2
     * @param {Room} room1 A room in the house/graph
     * @param {Room} room2 A room in the house/graph
     */
  removeEdge (room1, room2) {
    room1.removeEdge(room2)
  }

    /**
     * Remove edges from room1 to room2 and room2 to room1
     * @param {Room} room1 A room in the house/graph
     * @param {Room} room2 A room in the house/graph
     */
  removeEdges (room1, room2) {
    room1.removeEdge(room2)
    room2.removeEdge(room1)
  }

    /**
     * Remove an Item form a room
     * @param {Item} item The item to be removed
     * @param {Room} room The room the item will be removed from
     */
  removeItem (item, room) {
    room.removeItem(item)
  }

    /**
     * Remove a player from a room
     * @param {Player} player
     * @param {Room} room
     */
  removePlayer (player, room) {
    room.removePlayer(player)
  }

  getDirTree () {
    fs.readdir(this.dir, (error, data) => {
      if (error) {
        console.log(error)
      } else {
        for (let file of data) {
          if (file.endsWith('.dae')) {
            console.log(file)
            console.log(`${this.dir}/${file}`)
            console.log(file.substr(0, file.length - 4))
          }
        }
      }
    })
  }
}

module.exports = {
  RoomGraph: RoomGraph
}
