enum Size {
  Small,
  Medium,
  Big,
}

interface FastFoodBuilder {
  buildBurger(size?: Size): FastFoodBuilder
  buildFries(size?: Size): FastFoodBuilder
  buildCola(size?: Size): FastFoodBuilder
  getMeal(): FastFood
}

class FastFood {
  private _burger: IMeal[]
  private _fries: IMeal[]
  private _cola: IMeal[]

  constructor(meal: IMeal[]) {
    this._burger = meal.filter((m) => m.type === IMealType.Burger)
    this._fries = meal.filter((m) => m.type === IMealType.Fries)
    this._cola = meal.filter((m) => m.type === IMealType.Cola)
  }

  public get burger() {
    return this._burger
  }

  public get fires() {
    return this._fries
  }

  public get cola() {
    return this._cola
  }
}

interface IMeal {
  type: IMealType
  size: Size
  options: {}
}

enum IMealType {
  Burger,
  Cola,
  Fries,
}

class Mcdonalds implements FastFoodBuilder {
  private _meal: IMeal[] = []

  buildBurger(size: Size = Size.Big): FastFoodBuilder {
    this._meal.push({
      type: IMealType.Burger,
      size,
      options: { sauce: false },
    })
    return this
  }

  buildFries(size: Size = Size.Medium): FastFoodBuilder {
    this._meal.push({
      type: IMealType.Fries,
      size,
      options: { ice: false },
    })
    return this
  }

  buildCola(size: Size = Size.Big): FastFoodBuilder {
    this._meal.push({
      type: IMealType.Cola,
      size,
      options: { 'sauce-amount': 2 },
    })
    return this
  }

  getMeal(): FastFood {
    const fastfoot: FastFood = new FastFood(this._meal)
    this._meal.length = 0
    return fastfoot
  }
}

class mealEngineer {
  builder: FastFoodBuilder

  constructor(builder: FastFoodBuilder) {
    this.builder = builder
  }

  createfullMenu(): void {
    this.builder.buildBurger().buildCola().buildFries()
  }

  createBurder(size: Size): void {
    this.builder = this.builder.buildBurger(size)
  }

  createCola(size: Size): void {
    this.builder = this.builder.buildCola(size)
  }
}

const mcd: Mcdonalds = new Mcdonalds()
const enginner = new mealEngineer(mcd)

enginner.createfullMenu()
const fullMenu: FastFood = mcd.getMeal()
console.log(fullMenu)

enginner.createBurder(Size.Big)
enginner.createCola(Size.Medium)
const burgerWithCola: FastFood = mcd.getMeal()
console.log(burgerWithCola)
