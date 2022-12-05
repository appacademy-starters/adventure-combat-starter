"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./test-common");
const chai_1 = require("chai");
const player_1 = require("../class/player");
const room_1 = require("../class/room");
const item_1 = require("../class/item");
const food_1 = require("../class/food");
const world_1 = require("../class/world");
const character_1 = require("../class/character");
const enemy_1 = require("../class/enemy");
describe("Enemy", function () {
    let enemy;
    let room;
    let item;
    let sandwich;
    let player;
    beforeEach(function () {
        room = new room_1.Room("Test Room", "A test room");
        item = new item_1.Item("rock", "just a simple rock");
        sandwich = new food_1.Food("sandwich", "a delicious looking sandwich");
        enemy = new enemy_1.Enemy("enemy", "an ordinary character", room);
        player = new player_1.Player("player", room);
        world_1.World.enemies.push(enemy);
        world_1.World.setPlayer(player);
        enemy.items.push(item);
        room.items.push(sandwich);
    });
    it("should inherit from Character class", function () {
        (0, chai_1.expect)(enemy instanceof character_1.Character).to.be.true;
        (0, chai_1.expect)(enemy instanceof enemy_1.Enemy).to.be.true;
        (0, chai_1.expect)(enemy instanceof player_1.Player).to.be.false;
    });
    it("should have a cooldown attribute that defaults to 3000ms", function () {
        (0, chai_1.expect)(enemy.cooldown).to.equal(3000);
    });
    it("should be able to move to a new room", function () {
        let westRoom = new room_1.Room("West Room", "A room to the west of testRoom");
        room.connectRooms("w", westRoom);
        enemy.cooldown = 0;
        (0, chai_1.expect)(enemy.currentRoom).to.equal(room);
        enemy.randomMove();
        (0, chai_1.expect)(enemy.currentRoom).to.equal(westRoom);
        (0, chai_1.expect)(enemy.cooldown).above(0);
    });
    it("should target the player when hit", function () {
        (0, chai_1.expect)(enemy.attackTarget).to.equal(null);
        player.hit("enemy");
        (0, chai_1.expect)(enemy.attackTarget).to.equal(player);
    });
    it("should attack the player when targeting player", function () {
        player.hit("enemy");
        enemy.cooldown = 0;
        (0, chai_1.expect)(player.health).to.equal(100);
        enemy.attack();
        (0, chai_1.expect)(player.health).to.equal(90);
        (0, chai_1.expect)(enemy.cooldown).above(0);
    });
});
//# sourceMappingURL=enemy-spec.js.map