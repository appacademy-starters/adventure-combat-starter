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
    }
    die() {
        //drop all held items
        if (this.items.length > 0 && this.currentRoom) {
            this.currentRoom.items = this.items;
            this.items = []; //make sure this is actually ok
        }
        this.currentRoom = null;
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map