"use strict";

module.exports = exports = Item;

function Item(id) {
    this.id = id;
    this.name = "";
    this.desc = "";
    this.used = false;

    this.send = {
        id: this.id
    };
    this.setNameDesc(id);
}

Item.prototype.update = function () {
    this.send = {
        id: this.id
    };
}

Item.prototype.setNameDesc = function (id) {
    switch(id){
        case 0: 
            this.name = "Sword";
            this.desc = "ajksdlf;ahwfeewkmfnks;danp";
        break;
    }
}