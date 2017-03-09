'use strict';

const assert = require('assert');
const {Graph} = require('../server/room');


describe('Graph', () => {
    let graph = new Graph(`${__dirname}/public/models`);

    it ('should start empty', () => {
        assert.equal(graph.rooms, 0);
    });

    it ('should create rooms', () => {
        graph.createRoom()
        assert.equal(graph.rooms.length, 2);
    });
});