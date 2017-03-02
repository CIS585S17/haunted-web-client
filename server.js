const {Graph} = require('./room');

var express = require('express');

var app = express();

app.use(express.static('public'));

app.listen('5000', ()=>{
  'Listening at http://localhost:5000';
});


let graph = new Graph(`${__dirname}/public/models`);
graph.getDirTree();
// graph.getDirTree('./public/models');