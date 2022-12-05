"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, description, currentRoom) {
        this.name = name;
        this.description = description;
        this.currentRoom = currentRoom;
        this.health = 100;
        this.strength = 10;
        this.items = [];
    }
    applyDamage(amount) {
        this.health -= amount;
        console.log(this.health);
        if (this.health <= 0) {
            this.die();
        }
    }
    die() {
        //drop all held items
        if (this.items.length > 0 && this.currentRoom) {
            this.currentRoom.items = this.items;
            this.items = [];
        }
        this.currentRoom = null;
        console.log("You are dead!");
    }
}
exports.Character = Character;
/*
let a = new Character("A", "character A", 1);
let rock = new Item("rock", "simple rock");

a.items.push(rock);

a.applyDamage(100); */
//# sourceMappingURL=character.js.map