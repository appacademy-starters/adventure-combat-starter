const { Item } = require("./item");

class Food extends Item {
  constructor(name, description) {
    super(name, description);
  }
}

module.export { Food };
