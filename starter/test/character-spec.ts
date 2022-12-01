import "./test-common";

import { expect } from "chai";
import { Character } from "../class/character";
import { Enemy } from "../class/enemy";
import { Item } from "../class/item";
import { Player } from "../class/player";
import { Room } from "../class/room";

describe("Character", function () {
  let character: Character;
  let room: Room;
  let item: Item;

  beforeEach(function () {
    room = new Room("Test Room", "A test room");
    item = new Item("rock", "just a simple rock");
    character = new Character("Character", "an ordinary character", room);
    character.items.push(item);
  });

  it("should have name and description attributes", function () {
    expect(character.name).to.equal("Character");
    expect(character.description).to.equal("an ordinary character");
  });

  it("should not be an instance of Enemy or Player", function () {
    expect(character instanceof Player).to.be.false;
    expect(character instanceof Enemy).to.be.false;
  });

  it("should have strength and health attributes", function () {
    expect(character.health).to.equal(100);
    expect(character.strength).to.equal(10);
  });

  it("should lose health when damage is applied", function () {
    expect(character.health).to.equal(100);
    character.applyDamage(10);
    expect(character.health).to.equal(90);
  });

  it("should drop all held items and have currentRoom set to null when dead", function () {
    expect(character.currentRoom).to.equal(room);
    expect(room.items.length).to.equal(0);
    character.die();
    expect(character.currentRoom).to.equal(null);
    expect(room.items.length).to.equal(1);
    expect(room.items[0]).to.equal(item);
  });

  it("should die when damage brings health to 0 or less", function () {
    expect(character.currentRoom).to.equal(room);
    expect(room.items.length).to.equal(0);

    expect(character.health).to.equal(100);
    character.applyDamage(100);
    expect(character.health).to.equal(0);

    expect(character.currentRoom).to.equal(null);
    expect(room.items.length).to.equal(1);
    expect(room.items[0]).to.equal(item);
  });
});
