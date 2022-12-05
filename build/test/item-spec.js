"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./test-common");
const chai_1 = require("chai");
const player_js_1 = require("../class/player.js");
const room_js_1 = require("../class/room.js");
const item_js_1 = require("../class/item.js");
const food_js_1 = require("../class/food.js");
describe("Item", function () {
    it("should have name and description attributes", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        (0, chai_1.expect)(item.name).to.equal("rock");
        (0, chai_1.expect)(item.description).to.equal("just a simple rock");
    });
    it("can be retrieved from player inventory by name", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        let room = new room_js_1.Room("Test Room", "A test room");
        let player = new player_js_1.Player("player", room);
        player.items.push(item);
        (0, chai_1.expect)(player.items.length).to.equal(1);
        (0, chai_1.expect)(player.getItemByName("rock")).to.equal(item);
    });
    it("can be retrieved from a room by name", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        let room = new room_js_1.Room("Test Room", "A test room");
        room.items.push(item);
        (0, chai_1.expect)(room.items.length).to.equal(1);
        (0, chai_1.expect)(room.getItemByName("rock")).to.equal(item);
    });
    it("can be picked up from a room by a player", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        let room = new room_js_1.Room("Test Room", "A test room");
        let player = new player_js_1.Player("player", room);
        room.items.push(item);
        (0, chai_1.expect)(room.items.length).to.equal(1);
        (0, chai_1.expect)(player.items.length).to.equal(0);
        player.takeItem("rock");
        (0, chai_1.expect)(room.items.length).to.equal(0);
        (0, chai_1.expect)(player.items.length).to.equal(1);
        (0, chai_1.expect)(player.getItemByName("rock")).to.equal(item);
    });
    it("can be dropped into a room by a player", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        let room = new room_js_1.Room("Test Room", "A test room");
        let player = new player_js_1.Player("player", room);
        player.items.push(item);
        (0, chai_1.expect)(room.items.length).to.equal(0);
        (0, chai_1.expect)(player.items.length).to.equal(1);
        player.dropItem("rock");
        (0, chai_1.expect)(room.items.length).to.equal(1);
        (0, chai_1.expect)(player.items.length).to.equal(0);
        (0, chai_1.expect)(room.getItemByName("rock")).to.equal(item);
    });
});
describe("Food", function () {
    it("should have name and description attributes", function () {
        let food = new food_js_1.Food("sandwich", "a delicious sandwich");
        (0, chai_1.expect)(food.name).to.equal("sandwich");
        (0, chai_1.expect)(food.description).to.equal("a delicious sandwich");
    });
    it("should be an instance of Item and Food", function () {
        let food = new food_js_1.Food("sandwich", "a delicious sandwich");
        let item = new item_js_1.Item("rock", "just a simple rock");
        (0, chai_1.expect)(food instanceof item_js_1.Item).to.be.true;
        (0, chai_1.expect)(food instanceof food_js_1.Food).to.be.true;
        (0, chai_1.expect)(item instanceof item_js_1.Item).to.be.true;
        (0, chai_1.expect)(item instanceof food_js_1.Food).to.be.false;
    });
    it("can be eaten by a player", function () {
        let food = new food_js_1.Food("sandwich", "a delicious sandwich");
        let room = new room_js_1.Room("Test Room", "A test room");
        let player = new player_js_1.Player("player", room);
        player.items.push(food);
        (0, chai_1.expect)(player.items.length).to.equal(1);
        player.eatItem("sandwich");
        (0, chai_1.expect)(player.items.length).to.equal(0);
    });
    it("cannot be eaten by a player if not food", function () {
        let item = new item_js_1.Item("rock", "just a simple rock");
        let room = new room_js_1.Room("Test Room", "A test room");
        let player = new player_js_1.Player("player", room);
        player.items.push(item);
        (0, chai_1.expect)(player.items.length).to.equal(1);
        player.eatItem("rock");
        (0, chai_1.expect)(player.items.length).to.equal(1);
    });
});
//# sourceMappingURL=item-spec.js.map