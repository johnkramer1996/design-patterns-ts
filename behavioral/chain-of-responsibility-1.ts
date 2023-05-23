// http://www.newthinktank.com/2012/10/chain-of-responsibility-design-pattern-tutorial/

interface IHandler {
  setNext(handler: IHandler): IHandler
  handle(request: string): string
}

abstract class AbstractHandler implements IHandler {
  private nextHandler!: IHandler
  protected abstract food: string
  protected abstract name: string

  public setNext(handler: IHandler): IHandler {
    return (this.nextHandler = handler)
  }

  public handle(request: string): string {
    if (request === this.food) return this.name
    if (this.nextHandler) return this.nextHandler.handle(request)

    return 'Not found'
  }
}

class MonkeyHandler extends AbstractHandler {
  food: string = 'Banana'
  name: string = 'Monkey'
}

class SquirrelHandler extends AbstractHandler {
  food: string = 'Nut'
  name: string = 'Squirrel'
}

class DogHandler extends AbstractHandler {
  food: string = 'MeatBall'
  name: string = 'Dog'
}

class ChaiOfResponsibilityExample {
  monkey = new MonkeyHandler()
  squirrel = new SquirrelHandler()
  dog = new DogHandler()
  foods = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall']

  constructor() {
    this.configurate()
    this.run(this.monkey)
    console.log('\nSubchain: Squirrel > Dog\n')
    this.run(this.squirrel)
  }

  private configurate() {
    this.monkey.setNext(this.squirrel).setNext(this.dog)
  }

  private run(handler: IHandler) {
    for (const food of this.foods) {
      console.log(`Client: Who wants a ${food}?`)

      const result = handler.handle(food)
      if (result) console.log(`${result}`)
      else console.log(`${food} was left untouched.`)
    }
  }
}

new ChaiOfResponsibilityExample()
