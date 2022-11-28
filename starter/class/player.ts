import { Character } from "./character";
import { Enemy } from "./enemy";
import { Food } from "./food";
import { Item } from "./item.js";
import { Room } from "./room.js";
import { newArrWithoutItem } from "./array-utilities.js";

class Player extends Character {
  public items: Item[] = [];
  constructor(name: string, 
              description: string, 
              currentRoom: Room) {
    super(name, description, currentRoom);
  }

  move(direction: string) {
    if (this.currentRoom) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);
  
    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
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
    let itemObj = this.currentRoom.getItemByName(itemName);
    if (itemObj) {
      //item exists in this current room
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
    if (this.currentRoom) {
      let dropItem = this.getItemByName(itemName);
    if (dropItem) {
      this.items = newArrWithoutItem(this.items, dropItem);
      this.currentRoom.items.push(dropItem);
      console.log(`You have left ${itemName} at ${this.currentRoom.name}.`);
    }
  }
  }

  eatItem(itemName: string) {
    let foodObj = this.getItemByName(itemName);
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

  getItemByName(itemName: string) {
    let itemFromInv = this.items.find((el) => el.name === itemName);
    if (itemFromInv) {
      return itemFromInv;
    } else {
      console.log(`You do not have ${itemName} in your inventory.`);
    }
  }

  hit(name: string) {
    // Fill this in
  }

  override die() {
    super.die();
    //drop all items
    //this.items.
    console.log("You are dead!");
    process.exit();
  }
}

export { Player };
