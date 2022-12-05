"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./test-common");
const chai_1 = require("chai");
const character_1 = require("../class/character");
const enemy_1 = require("../class/enemy");
const food_1 = require("../class/food");
const item_1 = require("../class/item");
const player_1 = require("../class/player");
const room_1 = require("../class/room");
describe("Player", function () {
    let player;
    let room;
    let item;
    beforeEach(function () {
        room = new room_1.Room("Test Room", "A test room");
        item = new item_1.Item("rock", "just a simple rock");
        player = new player_1.Player("Player", room);
        player.items.push(item);
    });
    it("should have name and description attributes", function () {
        (0, chai_1.expect)(player.name).to.equal("Player");
        (0, chai_1.expect)(player.description).to.equal("main character");
    });
    it("should inherit from Character class", function () {
        (0, chai_1.expect)(player instanceof character_1.Character).to.be.true;
        (0, chai_1.expect)(player instanceof player_1.Player).to.be.true;
        (0, chai_1.expect)(player instanceof enemy_1.Enemy).to.be.false;
    });
    it("should have strength and health attributes", function () {
        // TODO: I'm not sure what these values are actually supposed to be for the player
        (0, chai_1.expect)(player.health).to.equal(100);
        (0, chai_1.expect)(player.strength).to.equal(10);
    });
    it("should be able to move in a valid direction", function () {
        let secondRoom = new room_1.Room("Test Room 2", "Another test room");
        room.connectRooms("s", secondRoom);
        player.move("s");
        (0, chai_1.expect)(player.currentRoom).to.equal(secondRoom);
    });
    it("should not be able to move in an invalid direction", function () {
        let secondRoom = new room_1.Room("Test Room 2", "Another test room");
        room.connectRooms("s", secondRoom);
        player.move("n");
        (0, chai_1.expect)(player.currentRoom).to.equal(room);
    });
    it("should be able to pick up an item in the room", function () {
        let itemInRoom = new item_1.Item("stick", "just a wooden stick");
        room.items.push(itemInRoom);
        let beforeLength = player.items.length;
        player.takeItem("stick");
        (0, chai_1.expect)(player.items).to.contain(itemInRoom);
        (0, chai_1.expect)(room.items).to.not.contain(itemInRoom);
        (0, chai_1.expect)(player.items).to.have.length(beforeLength + 1);
    });
    it("should not be able to pick up an invalid item", function () {
        let beforeLength = player.items.length;
        player.takeItem("stick");
        (0, chai_1.expect)(player.items).to.have.length(beforeLength);
    });
    it("should be able to drop an item it has", function () {
        let beforeLength = player.items.length;
        player.dropItem(item.name);
        (0, chai_1.expect)(player.items).to.not.contain(item);
        (0, chai_1.expect)(room.items).to.contain(item);
        (0, chai_1.expect)(player.items).to.have.length(beforeLength - 1);
    });
    it("should not be able to drop an invalid item", function () {
        let beforeLength = player.items.length;
        player.dropItem("stick");
        (0, chai_1.expect)(player.items).to.have.length(beforeLength);
    });
    it("should be able to eat food in inventory", function () {
        let food = new food_1.Food("meat", "A chunk of mystery meat");
        player.items.push(food);
        let beforeLength = player.items.length;
        player.eatItem(food.name);
        (0, chai_1.expect)(player.items).to.have.length(beforeLength - 1);
    });
    it("should not be able to eat food in the room", function () {
        let food = new food_1.Food("meat", "A chunk of mystery meat");
        room.items.push(food);
        let beforeLength = player.items.length;
        player.eatItem(food.name);
        (0, chai_1.expect)(player.items).to.have.length(beforeLength);
    });
    it("should not be able to eat food not in the room", function () {
        let beforeLength = player.items.length;
        player.eatItem("meat");
        (0, chai_1.expect)(player.items).to.have.length(beforeLength);
    });
    it("should return an item by name", function () {
        let newItem = player.getItemByName(item.name);
        (0, chai_1.expect)(newItem).to.equal(item);
    });
    it("should be able to attack an enemy in the room", function () {
        let enemy = new enemy_1.Enemy("Ogre", "A big, mean, ugly, nasty, green dude", room);
        let beforeHealth = enemy.health;
        player.hit(enemy.name);
        (0, chai_1.expect)(enemy.health).to.be.equal(beforeHealth - 10);
        // Alternatively
        // expect(enemy.health).to.be.lessThan(beforeHealth);
    });
    it("should not be able to attack an enemy in a different room", function () {
        let otherRoom = new room_1.Room("Another Room", "Just another room");
        room.connectRooms("s", otherRoom);
        let enemy = new enemy_1.Enemy("Ogre", "A big, mean, ugly, nasty, green dude", otherRoom);
        let beforeHealth = enemy.health;
        player.hit(enemy.name);
        (0, chai_1.expect)(enemy.health).to.be.equal(beforeHealth - 10);
        // Alternatively
        // expect(enemy.health).to.be.lessThan(beforeHealth);
    });
});
//# sourceMappingURL=player-spec.js.map