import { Room } from "./room.js";
import { Item } from "./item.js";
//import { Enemy } from "./enemy.js";

class Character {
  public health = 100;
  public strength = 10;
  public items: Item[] = [];
  constructor(
    public name: string,
    public description: string,
    public currentRoom: Room | null
  ) {}

  applyDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    //drop all held items
    if (this.items.length > 0 && this.currentRoom) {
      this.currentRoom.items = this.items;
      this.items = [];
    }
    
    this.currentRoom = null;
  }
}

 export { Character };
