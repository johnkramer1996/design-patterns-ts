interface ICoffee {
  cost(): Number
}

class Coffee implements ICoffee {
  cost(): Number {
    return 10
  }
}

class CoffeeExtraDecorator implements ICoffee {
  private _coffee: ICoffee

  constructor(coffee: ICoffee) {
    this._coffee = coffee
  }

  cost(): Number {
    return this._coffee.cost()
  }
}

class BubbleDecorator extends CoffeeExtraDecorator {
  private _price: Number = 3

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf()
  }
}

class MilkDecorator extends CoffeeExtraDecorator {
  private _price: Number = 2.5
  private _freshExtra: Number = 1.5

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf() + this._freshExtra.valueOf()
  }
}

const general = new Coffee()
const withBubble = new BubbleDecorator(general)
const withMilk = new MilkDecorator(withBubble)
console.log(`Total: ${withMilk.cost()}`)
