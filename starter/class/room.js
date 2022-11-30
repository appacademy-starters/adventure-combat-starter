"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const world_1 = require("./world");
class Room {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.exits = {}; ///exit is an object with string keys and num values 
        this.items = [];
    }
    getEnemies() {
        return world_1.World.getEnemiesInRoom(this);
    }
    printRoom() {
        console.clear();
        console.log("");
        console.log(this.name);
        console.log("");
        console.log(this.description);
        console.log("");
        if (this.getEnemies().length > 0) {
            console.log(`Enemies: ${this.getEnemies()
                .map((enemy) => enemy.name)
                .join(", ")}`);
        }
        if (this.items.length > 0) {
            console.log(`Items: ${this.items.map((item) => item.name).join(", ")}`);
        }
        console.log(this.getExitsString());
        console.log("");
    }
    getExits() {
        return Object.keys(this.exits);
    }
    getExitsString() {
        return `Exits: ${this.getExits().join(", ")}`;
    }
    connectRooms(direction, connectingRoom) {
        // Check if the direction and connecting room are valid
        if (["n", "s", "e", "w"].indexOf(direction) < 0 || !connectingRoom) {
            throw new Error("Error: Invalid room connection");
        }
        this.exits[direction] = connectingRoom;
    }
    getRoomInDirection(direction) {
        return this.exits[direction]; //change this to return Room object?
    }
    getItemByNameRoom(itemName) {
        let returnItem = this.items.find((obj) => obj.name === itemName);
        if (returnItem) { // if items arr contains obj ItemName
            return returnItem; //return that Item obj
        }
        else {
            console.log(`This room does not contain ${itemName}. Try looking elsewhere.`);
        }
    }
    getEnemyByName(name) {
        // Fill this in
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map