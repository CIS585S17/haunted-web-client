'use strict';
const fs = require('fs');

class Item {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
}

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
    constructor(name, path) {
        this.edges = [];
        this.explored = false;
        this.items = {};
        this.name = name;
        this.path = path;
        this.players = [];
    }

    /**
     * Add connection between rooms
     * @param {Edge} edge The connction between two rooms
     */
    addEdge(edge) {
        this.edges.push(edge);
    }

    /**
     * Add an item to the room
     * @param {string} prop The name of the item to be added 
     * @param {object} value The item object to be added to this room
     */
    addItem(prop, value) {
        this.items[prop] = value;
    }

    /**
     * Add player to room
     * @param {Player} player The player to be added to this room
     */
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * The connection to be removed between two rooms
     * @param {Edge} edge 
     */
    removeEdge(edge) {
        let index = this.edges.indexOf(edge);
        this.edges.splice(index, 1);
    }

    removeItem(item) {
        // let index = this.items.indexOf(item);
        // this.items.splice(index, 1);
        delete this.items.item;
    }

    /**
     * Remove player from room
     * @param {Player} player The player to be removed from this room
     */
    removePlayer(player) {
        let index = this.players.indexOf(player)
        if (index != -1) {
            this.players.splice(index, 1);
        }
        else {

        }
    }
}

/**
 * 
 */
class Edge {
    /**
     * 
     * @param {Room} room1 
     * @param {Room} room2 
     */
    constructor(room1, room2) {
        this.room1 = room1;
        this.room2 = room2;
    }
}

/**
 * Graph for rooms of a house
 * Where each node is a room 
 * and edges connect rooms
 */
class Graph {
    /**
     * 
     * @param {*} dir The location of the dae files
     */
    constructor(dir) {
        this.dir = dir;
        this.rooms = [];
    }

    /**
     * Getter to get array of rooms
     */
    room() {
        for (let room of this.rooms) {
            console.log(room);
        }
    }

    /**
     * Add an edge between
     * @param {Room} room1 A room in the house/graph
     * @param {Room} room2 A room in the house/graph
     */
    addEdge(room1, room2) {
        // Check if Edge alredy exits between room1 and room2
        room1.addEdge(new Edge(room1, room2));
        room2.addEdge(new Edge(room1, room2));
    }

    /**
     * Add an item to a room
     * @param {string} prop The name of the item to be added 
     * @param {object} value The item object to be added to this room
     * @param {Room} room A room in the house/graph
     */
    addItem(prop, value, room, quantity) {
        room.addItem(prop, new Item(value, quantity));
    }

    /**
     * Create the rooms by loading in all dae files
     */
    createRoom() {
        try {
            let files = fs.readdirSync(this.dir);
            for (let file of files) {
                if (file.endsWith('.dae')) {
                    this.rooms.push(new Room(file.substr(0, file.length-4), `${this.dir}/${file}`));
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        // fs.readdir(this.dir, (error, data) => {
        //     if (error) {
        //         console.log(error);
        //     }
        //     else {
        //         for (let file of data) {
        //             if (file.endsWith('.dae')) {
        //                 this.rooms.push(new Room(file.substr(0, file.length-4), `${this.dir}/${file}`));
        //             }
        //         }
        //     }
        // });
    }

    /**
     * Adds player to a room
     * @param {Player} player A player in the game to be added to a room
     * @param {Room} room A room in the house/graph
     */
    addPlayer(player, room) {
        let index = this.rooms.indexOf(room);
        if (index != -1) {
            room.addPlayer(player);
        }
        else {
            // throw new ReferenceError;
        }
    }

    removeEdge(room1, room2) {
        
    }

    removeItem(item, room) {
        room.removeItem(item);
    }

    /**
     * Remove a player from a room
     * @param {Player} player 
     * @param {Room} room 
     */
    removePlayer(player, room) {
        room.removePlayer(player);
    }

    getDirTree() {
        fs.readdir(this.dir, (error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                for (let file of data) {
                    if (file.endsWith('.dae')) {
                        console.log(file);
                        console.log(`${this.dir}/${file}`);
                        console.log(file.substr(0, file.length-4));
                    }
                }
            }
        });
    }
}

module.exports = {
    Graph: Graph
}