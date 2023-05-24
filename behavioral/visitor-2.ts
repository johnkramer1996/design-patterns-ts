interface IVisitable {
  accept(visitor: IVisitor): void
}

interface IVisitor {
  visit(abstractCarPart: AbstractCarPart): void
}

abstract class AbstractCarPart implements IVisitable {
  #name: string
  #sku: string | undefined
  #price: number | undefined

  constructor(name: string, sku?: string, price?: number) {
    this.#name = name
    this.#sku = sku
    this.#price = price
  }

  public get name(): string {
    return this.#name
  }

  public set name(value: string) {
    this.#name = value
  }

  public get sku(): string | undefined {
    return this.#sku
  }

  public set sku(value: string | undefined) {
    this.#sku = value
  }

  public get price(): number | undefined {
    return this.#price
  }

  public set price(value: number | undefined) {
    this.#price = value
  }

  accept(visitor: IVisitor): void {
    visitor.visit(this)
  }
}

class CarBody extends AbstractCarPart {}

class Engine extends AbstractCarPart {}

class Wheel extends AbstractCarPart {}

class Car extends AbstractCarPart {
  #parts: AbstractCarPart[]

  constructor(name: string) {
    super(name)
    this.#parts = [
      new CarBody('Utility Body', 'ABC-123-21', 1001),
      new Engine('V8 engine', 'DEF-456-21', 2555),
      new Wheel('FrontLeft', 'GHI-789FL-21', 136),
      new Wheel('FrontRight', 'GHI-789FR-21', 136),
      new Wheel('BackLeft', 'GHI-789BL-21', 152),
      new Wheel('BackRight', 'GHI-789BR-21', 152),
    ]
  }

  accept(visitor: IVisitor) {
    super.accept(visitor)
    this.#parts.forEach((part) => part.accept(visitor))
  }
}

class PrintPartsVisitor implements IVisitor {
  visit(abstractCarPart: AbstractCarPart) {
    if (abstractCarPart.sku === undefined) {
      console.log(`${abstractCarPart.name}`)
      return
    }
    console.log(`${abstractCarPart.name}\t:${abstractCarPart.sku}\t:${abstractCarPart.price}`)
  }
}

class TotalPriceVisitor implements IVisitor {
  totalPrice = 0

  visit(abstractCarPart: AbstractCarPart) {
    this.totalPrice += abstractCarPart.price || 0
  }
}

class VisitorExample {
  car = new Car('DeLorean')

  constructor() {
    this.run()
  }

  run() {
    const printPartsVisitor = new PrintPartsVisitor()
    this.car.accept(printPartsVisitor)

    const totalPriceVisitor = new TotalPriceVisitor()
    this.car.accept(totalPriceVisitor)
    console.log(`Total Price = ${totalPriceVisitor.totalPrice}`)
  }
}

new VisitorExample()
