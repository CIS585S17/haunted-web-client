'use strict';
const fs = require('fs');

class Room {
    constructor(name) {
        this.name = name;
        this.edges = {};
    }

    addEdge(room) {
        this.edges[room.name] = room;
    }
}

class Edge {
    constructor(room1, room2) {
        this.room1 = room1;
        this.room2 = room2;
    }
}

class Graph {
    constructor(dir) {
        this.dir = dir;
        this.rooms = [];
    }

    createRoom() {
        
    }

    addEdge(room1, room2) {
        // Check if Edge alredy exits between room1 and room2
        let index1 = this.rooms.findIndex(function(room) {
            return room === room1;
        });
        let index2 = this.rooms.findIndex(function(room) {
            return room === room2;
        });
        this.rooms[index1].addEdge(this.rooms[index2]);
        this.rooms[index2].addEdge(this.rooms[index1]);
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