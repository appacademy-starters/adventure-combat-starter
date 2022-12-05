"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const character_1 = require("./character");
const food_1 = require("./food");
const array_utilities_js_1 = require("./array-utilities.js");
class Player extends character_1.Character {
    constructor(name, startingRoom) {
        super(name, "main character", startingRoom);
        this.items = [];
        this.currentRoom = startingRoom;
    }
    move(direction) {
        if (this.currentRoom) {
            //assigns nextRoom to a number (or falsey?)
            const nextRoom = this.currentRoom.getRoomInDirection(direction);
            // If the next room is valid, set the player to be in that room
            if (nextRoom) {
                //if nextRoom wasn't assigned a falsey value above
                this.currentRoom = nextRoom;
                this.currentRoom?.printRoom();
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
            // if currentRoom is not null
            let itemObj = this.currentRoom.getItemByName(itemName);
            if (itemObj) {
                //if item exists in this current room
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
        let dropItem = this.getItemByName(itemName);
        if (dropItem) {
            this.items = (0, array_utilities_js_1.newArrWithoutItem)(this.items, dropItem);
            this.currentRoom?.items.push(dropItem);
            console.log(`You have left ${itemName} at ${this.currentRoom?.name}.`);
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
        let enemyTarget = this.currentRoom?.getEnemyByName(name);
        if (enemyTarget) {
            //if name refers to an enemy in player's current room
            enemyTarget.applyDamage(10);
            enemyTarget.attackTarget = this;
        }
    }
    die() {
        super.die();
        console.log("You are dead!");
        process.exit();
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map