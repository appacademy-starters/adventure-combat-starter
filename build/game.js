"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support").install();
const readline_1 = __importDefault(require("readline"));
const player_1 = require("./class/player");
const world_1 = require("./class/world");
const world_data_1 = __importDefault(require("./data/world-data"));
let player;
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function printHelp() {
    console.log("Controls:");
    console.log("  Type 'h' for help");
    console.log("  Type 'q' to quit");
    console.log("  Type 'l' to look around");
    console.log("  Type 'i' to check your inventory");
    console.log("  Type 'take <item>' to take an item");
    console.log("  Type 'drop <item>' to drop an item");
    console.log("  Type 'eat <item>' to eat a food item");
    console.log("  Type 'n', 's', 'e', 'w' to move");
    console.log("");
}
function startGame() {
    console.clear();
    console.log("Welcome to App Academy Adventure!\n");
    rl.question("Please enter your name: ", (name) => {
        console.clear();
        console.log(`Hello, ${name}!\n`);
        // Create the world and player
        world_1.World.loadWorld(world_data_1.default);
        player = new player_1.Player(name, world_1.World.rooms[1]);
        world_1.World.setPlayer(player);
        // Show commands
        printHelp();
        rl.question("\nHit RETURN to start your adventure\n", () => {
            console.clear();
            player.currentRoom.printRoom();
            processCommand();
        });
    });
}
function processCommand() {
    rl.question("> ", (cmd) => {
        cmd = cmd.toLowerCase();
        if (cmd === "h") {
            printHelp();
        }
        else if (cmd === "q") {
            rl.close();
            process.exit();
        }
        else if (cmd === "l") {
            player.currentRoom.printRoom();
        }
        else if (cmd === "i") {
            player.printInventory();
        }
        else if (["n", "s", "e", "w"].indexOf(cmd) >= 0) {
            let direction = cmd;
            player.move(direction);
        }
        else if (cmd.startsWith("take ")) {
            let itemName = cmd.split(" ")[1];
            player.takeItem(itemName);
        }
        else if (cmd.startsWith("drop ")) {
            let itemName = cmd.split(" ")[1];
            player.dropItem(itemName);
        }
        else if (cmd.startsWith("eat ")) {
            let itemName = cmd.split(" ")[1];
            player.eatItem(itemName);
        }
        else if (cmd.startsWith("hit ")) {
            let enemyName = cmd.split(" ")[1];
            player.hit(enemyName);
        }
        else {
            console.log("Invalid command. Type 'h' for help.");
        }
        processCommand();
    });
}
startGame();
//# sourceMappingURL=game.js.map