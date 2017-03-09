'use strict';

const assert = require('assert');
const {Graph} = require('../server/room');


/**
 * Test the graph
 */
describe('Graph', () => {
    let graph = new Graph(`${__dirname}/../public/models`);

    /**
     * Upon creating graph it should intially have no rooms
     */
    it ('should start empty', () => {
        assert.equal(graph.rooms.length, 0);
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
     * Succeed when added edges between two rooms
     */
    describe('#addEdge()', () => {
        it ('should have edge', () => {
            graph.addEdge(graph.rooms[0], graph.rooms[1]);
            assert.equal(graph.rooms[0].edges.length, 1);
            assert.equal(graph.rooms[1].edges.length, 1);
        });
    });

    /**
     * Succeed when adding an item to a room
     */
    // describe('#addItem()', () => {
    //     it ('room 1 should have item "key" with quantity 3', () => {
    //         graph.addItem('key', 'key', graph.rooms[0], 3);
    //         assert.equal(graph.rooms[0].items.key.item, 'key');
    //         assert.equal(graph.rooms[0].items.key.quantity, 3);
    //     });
    // });

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
     * Succeed when removing edge from two rooms
     */
    describe('#removeEdge()', () => {
        it ('should remove edge from two rooms');
    });

    /**
     * Succeed when removing item from room
     */
    // describe('#removeItem()', () => {
    //     it ('should remove item from the room', () => {
    //         graph.addItem('knife', 'knife', graph.rooms[1], 1);
    //         graph.removeItem('knife', graph.rooms[1]);
    //         assert.equal(graph.rooms[1].items.length, 0);
    //     });
    // });

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

    // it ('should fail for no existent room', () => {
    //     assert.throws(ReferenceError, graph.addPlayer('player1', 'room'));
    // });
});