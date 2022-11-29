import { Room } from "./room.js";

class Character {
  public health = 100;
  public strength = 10;
  constructor(public name: string, 
              public description: string, 
              public currentRoom: Room | null) {
  }

  applyDamage(amount: number) {
    this.health -= amount;
  }

  die() {
    this.currentRoom = null; 
  }
}

export { Character };
