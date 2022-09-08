const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    let item = this.currentRoom.getItemByName(itemName);
    if (item){
        this.items.push(item);
        console.log(`${item.name} added to inventory`);
    }
    // Fill this in

  }

  dropItem(itemName) {
    let item = this.getItemByName(itemName);
        if (item){
            this.currentRoom.items.push(item);
            console.log(`${item.name} dropped`)
        }
    // Fill this in

  }

  eatItem(itemName) {
    let item = this.getItemByName(itemName);
        if ((item instanceof Food)){
            console.log(`${item.name} consumed`);
        } else {
            console.log(`You cant eat that`)
            this.items.push(item)
        }

    // Fill this in

  }

  getItemByName(name) {
    for (let i = 0; i < this.items.length; i++){
      let itemName = this.items[i];
      if (itemName.name.includes(name)){
          return (this.items.splice(i, 1)[0]);
      }
  }
    // Fill this in

  }

  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name);
    if (!enemy){
      console.log("You cant hit that!");
    } else {
      enemy.apllyDamage(this.strength);
      console.log(`${enemy.name} hit for ${this.strength} damage`);
      enemy.setPlayer(this)
    }
    // Fill this in

  }

  die() {
    console.log("You died!");
    process.exit();
  }

}

module.exports = {
  Player,
};
