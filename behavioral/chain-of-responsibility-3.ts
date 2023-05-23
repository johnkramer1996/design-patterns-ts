class ShoppingCart {
  prices: number[]

  constructor(prices: number[]) {
    this.prices = prices
  }

  getTotal(): number {
    return this.prices.reduce((a, b) => a + b, 0)
  }

  getLength(): number {
    return this.prices.length
  }
}

class Discount {
  nextHandler: Discount

  setNext(next: Discount) {
    return (this.nextHandler = next)
  }

  calc(products: ShoppingCart) {
    const total = products.getTotal()
    return total - (total / 10) * this.exec(products)
  }

  next(products: ShoppingCart, result: number): number {
    if (!this.nextHandler) return result
    return result + this.nextHandler.exec(products)
  }

  exec(_: ShoppingCart): number {
    return 0
  }
}

class NumberDiscount extends Discount {
  exec(products: ShoppingCart): number {
    return this.next(products, products.getLength() > 3 ? 0.05 : 0)
  }
}

class PriceDiscount extends Discount {
  exec(products: ShoppingCart): number {
    return this.next(products, products.getTotal() >= 100 ? 0.01 : 0)
  }
}

class NoneDiscount extends Discount {}

class ChaiOfResponsibilityExample {
  numberDiscount = new NumberDiscount()
  priceDiscount = new PriceDiscount()
  none = new NoneDiscount()

  constructor() {
    this.configurate()
    this.run(new ShoppingCart([210]))
    this.run(new ShoppingCart([10, 20, 30, 40, 50, 60]))
  }

  private configurate() {
    this.numberDiscount.setNext(this.priceDiscount).setNext(this.none)
  }

  private run(products: ShoppingCart) {
    console.log({
      total: products.getTotal(),
      discount: this.numberDiscount.calc(products),
    })
  }
}

new ChaiOfResponsibilityExample()
