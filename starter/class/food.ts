import { Item } from './item';

class Food extends Item {
  constructor(public override name: string, public override description: string) {
    super(name, description);
  }
}

export { Food };
