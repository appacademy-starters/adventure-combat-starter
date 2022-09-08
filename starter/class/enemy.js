const {Character} = require('./character');
const {World} = require('./world');
const {player} = require('./player')


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.coolDown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    const directions = ['n', 'e', 's', 'w'];
    for (let dir in directions){
      let room = this.currentRoom.exits[dir];
      if (room){
        this.currentRoom = room;
        this.coolDown = 3000;
        return room;
      }
    } 
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.attackTarget === null){
      return null;
    }

    this.attackTarget.applyDamage(this.strength)
    console.log(`${this.name} hit you for ${this.strength} damage`)
    this.coolDown += 3000;
    this.act();
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0){
      this.die(); 
    } else {
      this.attackTarget = this.player;
      this.act();
    }
  }



  act() {
    // Fill this in
    let randomNum = Math.floor(Math.random() * 5);

    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else if (this.attackTarget){
      this.attack();
    } else {
        if (randomNum > 2){
          this.scratchNose();
        } else if (randomNum === 1) {
          this.attackTarget = this.player;
          this.act();
        } else {
          this.randomMove();
        }
    }
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
