import { Character } from "./character";
import { Player } from "./player";
import { Room } from "./room.js";
import { World } from "./world";

class Enemy extends Character {
  public cooldown = 3000;
  public player?: Player;
  constructor(name: string, description: string, currentRoom: Room) {
    super(name, description, currentRoom); //health and strength should autmatically be inherited?
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  randomMove() {
    //Implement the ability for the goblin to move
    //to a different room on a cooldown timer
    let currentRoomExits = this.currentRoom?.getExits();
    if (currentRoomExits && this.currentRoom) {
      let randomExit: number = Math.floor(
        Math.random() * currentRoomExits.length
      );
      let nextRoom = this.currentRoom.getRoomInDirection(
        currentRoomExits[randomExit]
      );
      this.currentRoom = World.rooms[nextRoom];
    }
    this.cooldown += 3000;
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
    //Take a look at the Enemy.rest() setTimeout loop.
    //^There is a bug in this code. Can you find it?
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Implement the ability for the goblin to attack the player
    // back after being hit once
    //The goblin should attack the player on sight once hit - immediately?
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
      //add randomMove here??
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
