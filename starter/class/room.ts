import { World } from './world';
import { Item } from "./item.js";
import { Player } from './player';

class Room {
  public exits: Record<string, number>  = {}; ///exit is an object with string keys and num values 
  public items: Item[] = [];
  constructor(public name: string, public description: string) {
  }

  getEnemies() {
    return World.getEnemiesInRoom(this);
  }

  printRoom() {
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    if (this.getEnemies().length > 0) {
      console.log(
        `Enemies: ${this.getEnemies()
          .map((enemy) => enemy.name)
          .join(", ")}`
      );
    }
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map((item) => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    return Object.keys(this.exits);
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`;
  }

  connectRooms(direction: string, connectingRoom: number) {
    // Check if the direction and connecting room are valid
    if (["n", "s", "e", "w"].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction: string) {
    return this.exits[direction]; //change this to return Room object?
  }

  getItemByNameRoom(itemName: string) {
    let returnItem = this.items.find((obj) => obj.name === itemName);
    if (returnItem) { // if items arr contains obj ItemName
      return returnItem; //return that Item obj
    } else {
      console.log(`This room does not contain ${itemName}. Try looking elsewhere.`);
  }
  }

  getEnemyByName(name: string) {
    // Fill this in
  }
}

export { Room };
