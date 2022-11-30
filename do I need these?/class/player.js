"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const character_1 = require("./character");
const food_1 = require("./food");
const array_utilities_js_1 = require("./array-utilities.js");
class Player extends character_1.Character {
    constructor(name, description, currentRoom) {
        super(name, description, currentRoom);
        this.items = [];
    }
    move(direction) {
        if (this.currentRoom) {
            //assigns nextRoom to a number (or falsey?)
            const nextRoom = this.currentRoom.getRoomInDirection(direction);
            //right
            //ok so this would mean going back to roomList 
            //oops yeah that is what I meant
            //I have the windows open side by side btw
            //so back to world
            // If the next room is valid, set the player to be in that room
            if (nextRoom) { //if nextRoom wasn't assigned a falsey value above
                this.currentRoom = nextRoom;
                nextRoom.printRoom(this);
            }
            else {
                console.log("You cannot move in that direction");
            }
        }
    }
    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        }
        else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }
    takeItem(itemName) {
        if (this.currentRoom) {
            let itemObj = this.currentRoom.getItemByName(itemName);
            if (itemObj) {
                //item exists in this current room
                this.currentRoom.items = (0, array_utilities_js_1.newArrWithoutItem)(this.currentRoom.items, itemObj);
                //item removed from current room
                this.items.push(itemObj); //item added to inventory
                console.log(`You have added ${itemName} to your items.`);
            }
            else {
                console.log(`This room does not contain ${itemName}. Try looking elsewhere.`);
            }
        }
    }
    dropItem(itemName) {
        if (this.currentRoom) {
            let dropItem = this.getItemByName(itemName);
            if (dropItem) {
                this.items = (0, array_utilities_js_1.newArrWithoutItem)(this.items, dropItem);
                this.currentRoom.items.push(dropItem);
                console.log(`You have left ${itemName} at ${this.currentRoom.name}.`);
            }
        }
    }
    eatItem(itemName) {
        let foodObj = this.getItemByName(itemName);
        if (foodObj) {
            if (foodObj instanceof food_1.Food) {
                //set items to a new array with that item removed
                this.items = (0, array_utilities_js_1.newArrWithoutItem)(this.items, foodObj);
                console.log(`You ate the ${itemName}`);
            }
            else {
                console.log(`${itemName} is not food, you cannot eat it.`);
            }
        }
    }
    getItemByName(itemName) {
        let itemFromInv = this.items.find((el) => el.name === itemName);
        if (itemFromInv) {
            return itemFromInv;
        }
        else {
            console.log(`You do not have ${itemName} in your inventory.`);
        }
    }
    hit(name) {
        // Fill this in
    }
    die() {
        super.die();
        //drop all items
        //this.items.
        console.log("You are dead!");
        process.exit();
    }
}
exports.Player = Player;
//lolnvrmnd
//# sourceMappingURL=player.js.map