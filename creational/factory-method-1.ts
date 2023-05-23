enum CoffeeType {
  ESPRESSO,
  AMERICANO,
  LATTE,
  CAPPUCCINO,
}

enum CoffeeSize {
  SM,
  MD,
  LG,
}

class Coffee {
  public size: CoffeeSize
  public price: number

  constructor(size = CoffeeSize.MD, price: number) {
    this.size = size
    this.price = price
  }

  public grindCoffee(): void {
    console.log('grindCoffee')
  }

  public makeCoffee(): void {
    console.log('makeCoffee')
  }

  public pourIntoCup(): void {
    console.log('pourIntoCup')
  }

  public getPrice(): void {
    console.log(this.price)
  }
}

class Americano extends Coffee {
  public makeCoffee(): void {
    console.log('Americano')
  }
}

class Cappuccino extends Coffee {
  public makeCoffee(): void {
    console.log('Cappuccino')
  }
}

class Latte extends Coffee {
  public makeCoffee(): void {
    console.log('Latte')
  }
}

class Espresso extends Coffee {
  public makeCoffee(): void {
    console.log('Espresso')
  }
}

abstract class CoffeeFactory {
  public create(size: CoffeeSize): Coffee {
    return this.createCoffee(size)
  }

  public abstract createCoffee(size: CoffeeSize): Coffee
  public abstract prices: { [CoffeeSize: string]: number }
}

class AmericanoCoffeeFactory extends CoffeeFactory {
  public prices = {
    [CoffeeSize.SM]: 200,
    [CoffeeSize.MD]: 300,
    [CoffeeSize.LG]: 400,
  }

  public createCoffee(size: CoffeeSize): Coffee {
    return new Americano(size, this.prices[size])
  }
}

class CappuccinoCoffeeFactory extends CoffeeFactory {
  public prices = {
    [CoffeeSize.SM]: 250,
    [CoffeeSize.MD]: 350,
    [CoffeeSize.LG]: 450,
  }

  public createCoffee(size: CoffeeSize): Coffee {
    return new Cappuccino(size, this.prices[size])
  }
}

class EspressoCoffeeFactory extends CoffeeFactory {
  public prices = {
    [CoffeeSize.SM]: 450,
    [CoffeeSize.MD]: 550,
    [CoffeeSize.LG]: 650,
  }

  public createCoffee(size: CoffeeSize): Coffee {
    return new Cappuccino(size, this.prices[size])
  }
}

class LatteCoffeeFactory extends CoffeeFactory {
  public prices = {
    [CoffeeSize.SM]: 350,
    [CoffeeSize.MD]: 450,
    [CoffeeSize.LG]: 550,
  }

  public createCoffee(size: CoffeeSize): Coffee {
    return new Cappuccino(size, this.prices[size])
  }
}

class FactoryMethodExample {
  factory: CoffeeFactory
  coffee: Coffee

  constructor() {
    for (let type of Object.values(CoffeeType)) {
      if (typeof type === 'string') continue
      this.factory = this.configure(type)
      for (let size of Object.values(CoffeeSize)) {
        if (typeof size === 'string') continue
        this.coffee = this.factory.create(size)
        this.run()
      }
    }
  }

  private configure(type: CoffeeType): CoffeeFactory {
    const factory = new [
      AmericanoCoffeeFactory,
      CappuccinoCoffeeFactory,
      EspressoCoffeeFactory,
      LatteCoffeeFactory,
    ][type]()

    return factory
  }

  private run(): void {
    this.coffee.grindCoffee()
    this.coffee.makeCoffee()
    this.coffee.pourIntoCup()
    this.coffee.getPrice()
  }
}

new FactoryMethodExample()
