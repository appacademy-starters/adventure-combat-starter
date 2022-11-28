import { World } from './world';
import { Item } from "./item.js";

class Room {
  public exits: Record<string, number>  = {}; //exit is an object with key: string value: num 
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

  connectRooms(direction: string, connectingRoom: Room) {
    // Check if the direction and connecting room are valid
    if (["n", "s", "e", "w"].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction: string) {
    return this.exits[direction];
  }

  getItemByName(name: string) {
    // Fill this in
  }

  getEnemyByName(name: string) {
    // Fill this in
  }
}

export { Room };
