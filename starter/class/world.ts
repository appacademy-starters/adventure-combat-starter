import { Room } from "./room";
import { Item } from "./item";
import { Food } from "./food";
import { Enemy } from "./enemy";
import { Player } from "./player";

class World {
  // 
  static rooms: Record<string, Room>  = {}; 
  static enemies:  Enemy[] = [];
  
  static setPlayer(player: Player) {
    for (let i = 0; i < World.enemies.length; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0; i < World.enemies.length; i++) {
      if (World.enemies[i]) {
        World.enemies[i].rest();
      }
    }
  }

  static getEnemiesInRoom(room: Room) {
    return World.enemies.filter((enemy) => enemy.currentRoom === room);
  }

  static loadWorld(worldData:  ) {
    // here are the keys of the object
    // this one is heterogenous and finite so you're not using a record
    // as in, there are three keys, and we know the types of their values
    // if you don't want to bother typing it, you can also just make it `any` and I won't judge you, I swear *gasp*
    //but actually I'm not sure what it would look like to type that out (not any)
    const roomList = worldData.rooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0; i < roomList.length; i++) {
      let roomData = roomList[i];
      let newRoom = new Room(roomData.name, roomData.description);

      World.rooms[roomData.id] = newRoom; 
    }

    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0; i < roomList.length; i++) {
      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }
    }

    // Instantiate items
    for (let i = 0; i < itemList.length; i++) {
      let itemData = itemList[i];
      let newItem: Item;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      let itemRoom = World.rooms[itemData.room];
      itemRoom.items.push(newItem);
    }

    // Instantiate enemies
    for (let i = 0; i < enemyList.length; i++) {
      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.currentRoom];
      let newEnemy = new Enemy(
        enemyData.name,
        enemyData.description,
        enemyRoom
      );
      World.enemies.push(newEnemy);
    }
  }
}

export { World };
