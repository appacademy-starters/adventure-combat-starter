import "./test-common";

import { expect } from "chai";
import { Character } from "../class/character";
import { Enemy } from "../class/enemy";
import { Food } from "../class/food";
import { Item } from "../class/item";
import { Player } from "../class/player";
import { Room } from "../class/room";
import { World } from "../class/world";

describe("Player", function () {
  let player: Player;
  let room: Room;
  let item: Item;

  beforeEach(function () {
    room = new Room("Test Room", "A test room");
    item = new Item("rock", "just a simple rock");
    player = new Player("Player", room);
    player.items.push(item);
    World.enemies = [];
  });

  it("should have name and description attributes", function () {
    expect(player.name).to.equal("Player");
    expect(player.description).to.equal("main character");
  });

  it("should inherit from Character class", function () {
    expect(player instanceof Character).to.be.true;
    expect(player instanceof Player).to.be.true;
    expect(player instanceof Enemy).to.be.false;
  });

  it("should have strength and health attributes", function () {
    // TODO: I'm not sure what these values are actually supposed to be for the player
    expect(player.health).to.equal(100);
    expect(player.strength).to.equal(10);
  });

  it("should be able to move in a valid direction", function () {
    let secondRoom = new Room("Test Room 2", "Another test room");
    room.connectRooms("s", secondRoom);
    player.move("s");
    expect(player.currentRoom).to.equal(secondRoom);
  });

  it("should not be able to move in an invalid direction", function () {
    let secondRoom = new Room("Test Room 2", "Another test room");
    room.connectRooms("s", secondRoom);
    player.move("n");
    expect(player.currentRoom).to.equal(room);
  });

  it("should be able to pick up an item in the room", function () {
    let itemInRoom = new Item("stick", "just a wooden stick");
    room.items.push(itemInRoom);
    let beforeLength = player.items.length;
    player.takeItem("stick");
    expect(player.items).to.contain(itemInRoom);
    expect(room.items).to.not.contain(itemInRoom);
    expect(player.items).to.have.length(beforeLength + 1);
  });

  it("should not be able to pick up an invalid item", function () {
    let beforeLength = player.items.length;
    player.takeItem("stick");
    expect(player.items).to.have.length(beforeLength);
  });

  it("should be able to drop an item it has", function () {
    let beforeLength = player.items.length;
    player.dropItem(item.name);
    expect(player.items).to.not.contain(item);
    expect(room.items).to.contain(item);
    expect(player.items).to.have.length(beforeLength - 1);
  });

  it("should not be able to drop an invalid item", function () {
    let beforeLength = player.items.length;
    player.dropItem("stick");
    expect(player.items).to.have.length(beforeLength);
  });

  it("should be able to eat food in inventory", function () {
    let food = new Food("meat", "A chunk of mystery meat");
    player.items.push(food);
    let beforeLength = player.items.length;
    player.eatItem(food.name);
    expect(player.items).to.have.length(beforeLength - 1);
  });

  it("should not be able to eat food in the room", function () {
    let food = new Food("meat", "A chunk of mystery meat");
    room.items.push(food);
    let beforeLength = player.items.length;
    player.eatItem(food.name);
    expect(player.items).to.have.length(beforeLength);
  });

  it("should not be able to eat food not in the room", function () {
    let beforeLength = player.items.length;
    player.eatItem("meat");
    expect(player.items).to.have.length(beforeLength);
  });

  it("should return an item by name", function () {
    let newItem = player.getItemByName(item.name);
    expect(newItem).to.equal(item);
  });

  it("should be able to attack an enemy in the room", function () {
    let enemy = new Enemy("Ogre", "A big, mean, ugly, nasty, green dude", room);
    World.enemies.push(enemy);
    let beforeHealth = enemy.health;
    player.hit(enemy.name);
    expect(enemy.health).to.be.equal(beforeHealth - 10);
    // Alternatively
    // expect(enemy.health).to.be.lessThan(beforeHealth);
  });

  it("should not be able to attack an enemy in a different room", function () {
    let otherRoom = new Room("Another Room", "Just another room");
    room.connectRooms("s", otherRoom);
    let enemy = new Enemy(
      "Ogre",
      "A big, mean, ugly, nasty, green dude",
      otherRoom
    );
    World.enemies.push(enemy);
    let beforeHealth = enemy.health;
    player.hit(enemy.name);
    expect(enemy.health).to.be.equal(beforeHealth);
    // Alternatively
    // expect(enemy.health).to.be.lessThan(beforeHealth);
  });
});
