"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const room_1 = require("./room");
const item_1 = require("./item");
const food_1 = require("./food");
const enemy_1 = require("./enemy");
class World {
    static setPlayer(player) {
        for (let i = 0; i < World.enemies.length; i++) {
            if (World.enemies[i]) {
                World.enemies[i].setPlayer(player);
            }
        }
    }
    static startGame() {
        for (let i = 0; i < World.enemies.length; i++) {
            if (World.enemies[i]) {
                World.enemies[i].rest();
            }
        }
    }
    static getEnemiesInRoom(room) {
        return World.enemies.filter((enemy) => enemy.currentRoom === room);
    }
    static loadWorld(worldData) {
        //world-data-types.ts -> interfaces that describe these types
        const roomList = worldData.rooms; //array of room objects with id, name, description, exits
        const itemList = worldData.items;
        const enemyList = worldData.enemies;
        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0; i < roomList.length; i++) {
            let roomData = roomList[i];
            let newRoom = new room_1.Room(roomData.name, roomData.description);
            World.rooms[roomData.id] = newRoom;
            //I'm not just going back to player where nextRoom is still num
        }
        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0; i < roomList.length; i++) {
            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;
            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = World.rooms[connectedRoomID];
                World.rooms[roomID].connectRooms(direction, roomToConnect);
            }
        }
        // Instantiate items
        for (let i = 0; i < itemList.length; i++) {
            let itemData = itemList[i];
            let newItem;
            if (itemData.isFood) {
                newItem = new food_1.Food(itemData.name, itemData.description);
            }
            else {
                newItem = new item_1.Item(itemData.name, itemData.description);
            }
            let itemRoom = World.rooms[itemData.room];
            itemRoom.items.push(newItem);
        }
        // Instantiate enemies
        for (let i = 0; i < enemyList.length; i++) {
            let enemyData = enemyList[i];
            let enemyRoom = World.rooms[enemyData.currentRoom];
            let newEnemy = new enemy_1.Enemy(enemyData.name, enemyData.description, enemyRoom);
            World.enemies.push(newEnemy);
        }
    }
}
exports.World = World;
World.rooms = {};
World.enemies = [];
//# sourceMappingURL=world.js.map