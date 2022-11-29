import { Character } from "./character";
import { Player } from "./player";
import { Room } from "./room.js";

class Enemy extends Character {
  public cooldown = 3000;
  public player?: Player ;
  constructor(name: string, 
              description: string, 
              currentRoom: Room
              ) {
    super(name, description, currentRoom); //health and strength should autmatically be inherited?
  }

  setPlayer(player: Player) { 
    this.player = player;
  }
  

  randomMove() {
    let currentRoomExits = this.currentRoom?.getExits();
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message: string) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
  }

  override applyDamage(amount: number) {
    // Fill this in
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }

  scratchNose(): void {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);
  }
}

export { Enemy };
