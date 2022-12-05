import { Character } from "./character";
import { Enemy } from "./enemy";
import { Food } from "./food";
import { Room } from "./room";
import { newArrWithoutItem } from "./array-utilities.js";
import { World } from "./world";
import { Item } from "../class/item";

class Player extends Character {
  public override items: Item[] = [];
  constructor(name: string, description: string, startingRoom: Room) {
    super(name, "main character", startingRoom);
  }

  move(direction: string) {
    if (this.currentRoom) {
      //assigns nextRoom to a number (or falsey?)
      const nextRoom = this.currentRoom.getRoomInDirection(direction);
      // If the next room is valid, set the player to be in that room
      if (nextRoom) {
        //if nextRoom wasn't assigned a falsey value above
        this.currentRoom = World.rooms[nextRoom];

        this.currentRoom.printRoom();
      } else {
        console.log("You cannot move in that direction");
      }
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName: string) {
    if (this.currentRoom) {
      // if currentRoom is not null
      let itemObj = this.currentRoom.getItemByNameRoom(itemName);
      if (itemObj) {
        //if item exists in this current room
        this.currentRoom.items = newArrWithoutItem(
          this.currentRoom.items,
          itemObj
        );
        //item removed from current room
        this.items.push(itemObj); //item added to inventory
        console.log(`You have added ${itemName} to your items.`);
      } else {
        console.log(
          `This room does not contain ${itemName}. Try looking elsewhere.`
        );
      }
    }
  }

  dropItem(itemName: string) {
    let dropItem = this.getItemByNamePlayer(itemName);
    if (dropItem) {
      this.items = newArrWithoutItem(this.items, dropItem);
      this.currentRoom?.items.push(dropItem);
      console.log(`You have left ${itemName} at ${this.currentRoom?.name}.`);
    }
  }

  eatItem(itemName: string) {
    let foodObj = this.getItemByNamePlayer(itemName);
    if (foodObj) {
      if (foodObj instanceof Food) {
        //set items to a new array with that item removed
        this.items = newArrWithoutItem(this.items, foodObj);
        console.log(`You ate the ${itemName}`);
      } else {
        console.log(`${itemName} is not food, you cannot eat it.`);
      }
    }
  }

  getItemByNamePlayer(itemName: string) {
    let itemFromInv = this.items.find((el) => el.name === itemName);
    if (itemFromInv) {
      return itemFromInv;
    } else {
      console.log(`You do not have ${itemName} in your inventory.`);
    }
  }

  hit(name: string) {
    //how to reference the enemy obj by name?
    let enemyTarget = this.currentRoom
      ?.getEnemies()
      .find((enemy: Enemy) => enemy.name === name);
    if (enemyTarget) {
      //if name refers to an enemy in player's current room
      enemyTarget.applyDamage(10);
    }
  }

  override die() {
    super.die();
    console.log("You are dead!");
    process.exit();
  }
}

export { Player };
