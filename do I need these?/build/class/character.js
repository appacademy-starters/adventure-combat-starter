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
    }
    applyDamage(amount) {
        this.health -= amount;
    }
    die() {
        this.currentRoom = null;
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map