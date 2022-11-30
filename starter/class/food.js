"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const item_1 = require("./item");
class Food extends item_1.Item {
    constructor(name, description) {
        super(name, description);
        this.name = name;
        this.description = description;
    }
}
exports.Food = Food;
//# sourceMappingURL=food.js.map