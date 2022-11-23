class Character {
  constructor(name: string, description: string, currentRoom: number) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount: number) {
    this.health -= amount;
  }

  die() {
    this.currentRoom = null;
  }
}

export from { Character };
