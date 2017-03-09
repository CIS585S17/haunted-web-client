'use strict';
const fs = require('fs');

/**
 * A room in the house
 */
class Room {
    /**
     * 
     * @constructor
     * 
     * @param {*} edges Array holding edges between rooms
     * @param {*} items Dictionary of items in the room
     * @param {*} name The name of the file to be stored
     * @param {*} path The path of the file of the room
     */
    constructor(name, path) {
        this.edges = [];
        this.items = {};
        this.name = name;
        this.path = path;
        this.players = [];
    }

    /**
     * Add connection between rooms
     * @param {*} edge
     */
    addEdge(edge) {
        this.edges.push(edge);
    }

    addItem(prop, value) {
        this.items[prop] = value;
    }

    /**
     * Add player to room
     * @param {*} player 
     */
    addPlayer(player) {
        this.players.push(player);
    }

    removeEdge(edge) {

    }

    /**
     * Remove player from room
     * @param {*} player 
     */
    removePlayer(player) {
        let index = this.players.findIndex(function(p) {
            return p === player;
        });
        this.players.slice(index, 1);
    }
}

/**
 * 
 */
class Edge {
    /**
     * 
     * @param {*} room1 
     * @param {*} room2 
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
     * @param {*} room1 
     * @param {*} room2 
     */
    addEdge(room1, room2) {
        // Check if Edge alredy exits between room1 and room2
        room1.addEdge(new Edge(room1, room2));
        room2.addEdge(new Edge(room1, room2));
    }

    addItem(prop, value, room) {
        room.addItem(prop, value);
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
     * @param {*} player 
     * @param {*} room 
     */
    addPlayer(player, room) {
        room.addPlayer(player);
    }

    removeEdge(room1, room2) {
        
    }

    /**
     * Remove a player from a room
     * @param {*} player 
     * @param {*} room 
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