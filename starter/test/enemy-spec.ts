import { expect } from "chai";

import { Player } from "../class/player";
import { Room } from "../class/room";
import { Item } from "../class/item";
import { Food } from "../class/food";

import { World } from "../class/world";

import { Character } from "../class/character";
import { Enemy } from "../class/enemy";

describe("Enemy", function () {
  let enemy: Enemy;
  let room: Room;
  let item: Item;
  let sandwich: Food;
  let player: Player;

  beforeEach(function () {
    room = new Room("Test Room", "A test room");
    item = new Item("rock", "just a simple rock");
    sandwich = new Food("sandwich", "a delicious looking sandwich");
    enemy = new Enemy("enemy", "an ordinary character", room);
    player = new Player("player", room);

    World.enemies.push(enemy);
    World.setPlayer(player);

    enemy.items.push(item);
    room.items.push(sandwich);
  });

  it("should inherit from Character class", function () {
    expect(enemy instanceof Character).to.be.true;
    expect(enemy instanceof Enemy).to.be.true;
    expect(enemy instanceof Player).to.be.false;
  });

  it("should have a cooldown attribute that defaults to 3000ms", function () {
    expect(enemy.cooldown).to.equal(3000);
  });

  it("should be able to move to a new room", function () {
    let westRoom = new Room("West Room", "A room to the west of testRoom");
    room.connectRooms("w", westRoom);

    enemy.cooldown = 0;

    expect(enemy.currentRoom).to.equal(room);

    enemy.randomMove();

    expect(enemy.currentRoom).to.equal(westRoom);
    expect(enemy.cooldown).above(0);
  });

  it("should target the player when hit", function () {
    expect(enemy.attackTarget).to.equal(null);

    player.hit("enemy");

    expect(enemy.attackTarget).to.equal(player);
  });

  it("should attack the player when targeting player", function () {
    player.hit("enemy");

    enemy.cooldown = 0;

    expect(player.health).to.equal(100);
    enemy.attack();
    expect(player.health).to.equal(90);
    expect(enemy.cooldown).above(0);
  });
});
