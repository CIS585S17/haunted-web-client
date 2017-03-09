'use strict';

const assert = require('assert');
const {RoomGraph} = require('../server/room');


/**
 * Test the graph
 */
describe('RoomGraph', () => {
    let graph = new RoomGraph(`${__dirname}/../public/models`);

    /**
     * Upon creating graph it should intially have no rooms
     */
    it ('should start empty', () => {
        assert.equal(graph.rooms.length, 0);
    });

    /**
     * Succeed when creating foyer
     */
    describe('#createFoyer()', () => {
        it ('should create the foyer');
    });

    /**
     * Succeed when creating rooms
     * Test should be updated upon adding more rooms to models file location
     */
    describe('#createRoom()', () => {
        it ('should create rooms', () => {
            graph.createRoom()
            assert.equal(graph.rooms.length, 2);
        });
    });

    /**
     * Succeed when added edge from room1 to room2
     */
    describe('#addEdge()', () => {
        it ('should have edge room1 to room2', () => {
            graph.addEdge(graph.rooms[0], graph.rooms[1]);
            assert.equal(graph.rooms[0].edges[0].room, graph.rooms[1]);
        });
    });

    /**
     * Succeed when added edges from room1 to room2 and room2 to room1
     */
    describe('#addEdges()', ()=> {
        it ('should have edges room1 to room2 and room2 to room1', () => {
            graph.addEdges(graph.rooms[0], graph.rooms[1]);
            assert.equal(graph.rooms[0].edges[0].room, graph.rooms[1]);
            assert.equal(graph.rooms[1].edges[0].room, graph.rooms[0]);
        });
    });

    /**
     * Succeed when adding an item to a room
     */
    describe('#addItem()', () => {
        it ('room 1 should have item "key"', () => {
            graph.addItem('key', graph.rooms[0]);
            assert.equal(graph.rooms[0].items[0], 'key');
        });
    });

    /**
     * Succeed when adding a player to a room
     */
    describe('#addPlayer()', () => {
        it ('room 2 should contain player', () => {
            graph.addPlayer('player', graph.rooms[1]);
            assert.equal(graph.rooms[1].players[0], 'player');
        });
    });

    /**
     * Succeed when removing edge from room1 to room2
     */
    describe('#removeEdge()', () => {
        it ('should remove edge from room1 to room2', () => {
            graph.addEdge(graph.rooms[0], graph.rooms[1]);
            graph.removeEdge(graph.rooms[0], graph.rooms[1]);
            assert.equal(graph.rooms[0].edges.length, 0);
        });
    });

    /**
     * Succeed when removing edges from room1 to room2 and room2 to room1
     */
    describe('#removeEdges()', () => {
        it ('should remove edge from room1 to room2 and room2 to room1', () => {
            graph.addEdges(graph.rooms[0], graph.rooms[1]);
            graph.removeEdges(graph.rooms[0], graph.rooms[1]);
            assert.equal(graph.rooms[0].edges.length, 0);
            assert.equal(graph.rooms[1].edges.length, 0);
        });
    });

    /**
     * Succeed when removing item from room
     */
    describe('#removeItem()', () => {
        it ('should remove item from the room', () => {
            graph.addItem('knife', graph.rooms[1]);
            graph.removeItem('knife', graph.rooms[1]);
            assert.equal(graph.rooms[1].items.length, 0);
        });
    });

    /**
     * Succeed when removing player from room
     */
    describe('#removePlayer()', () => {
        it ('should remove player from room', () => {
            graph.addPlayer('player1', graph.rooms[0]);
            graph.removePlayer('player1', graph.rooms[0]);
            assert.equal(graph.rooms[0].players.length, 0);
        });
    });
});