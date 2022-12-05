"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./test-common");
const chai_1 = require("chai");
const character_1 = require("../class/character");
const enemy_1 = require("../class/enemy");
const item_1 = require("../class/item");
const player_1 = require("../class/player");
const room_1 = require("../class/room");
describe("Character", function () {
    let character;
    let room;
    let item;
    beforeEach(function () {
        room = new room_1.Room("Test Room", "A test room");
        item = new item_1.Item("rock", "just a simple rock");
        character = new character_1.Character("Character", "an ordinary character", room);
        character.items.push(item);
    });
    it("should have name and description attributes", function () {
        (0, chai_1.expect)(character.name).to.equal("Character");
        (0, chai_1.expect)(character.description).to.equal("an ordinary character");
    });
    it("should not be an instance of Enemy or Player", function () {
        (0, chai_1.expect)(character instanceof player_1.Player).to.be.false;
        (0, chai_1.expect)(character instanceof enemy_1.Enemy).to.be.false;
    });
    it("should have strength and health attributes", function () {
        (0, chai_1.expect)(character.health).to.equal(100);
        (0, chai_1.expect)(character.strength).to.equal(10);
    });
    it("should lose health when damage is applied", function () {
        (0, chai_1.expect)(character.health).to.equal(100);
        character.applyDamage(10);
        (0, chai_1.expect)(character.health).to.equal(90);
    });
    it("should drop all held items and have currentRoom set to null when dead", function () {
        (0, chai_1.expect)(character.currentRoom).to.equal(room);
        (0, chai_1.expect)(room.items.length).to.equal(0);
        character.die();
        (0, chai_1.expect)(character.currentRoom).to.equal(null);
        (0, chai_1.expect)(room.items.length).to.equal(1);
        (0, chai_1.expect)(room.items[0]).to.equal(item);
    });
    it("should die when damage brings health to 0 or less", function () {
        (0, chai_1.expect)(character.currentRoom).to.equal(room);
        (0, chai_1.expect)(room.items.length).to.equal(0);
        (0, chai_1.expect)(character.health).to.equal(100);
        character.applyDamage(100);
        (0, chai_1.expect)(character.health).to.equal(0);
        (0, chai_1.expect)(character.currentRoom).to.equal(null);
        (0, chai_1.expect)(room.items.length).to.equal(1);
        (0, chai_1.expect)(room.items[0]).to.equal(item);
    });
});
//# sourceMappingURL=character-spec.js.map