enum Operator {
  Add,
  Subtract,
  Mult,
  Divide,
}

interface IHandler {
  setNext(handler: IHandler): IHandler
  handle(request: Numbers): string
  calculate(request: Numbers): number
}

abstract class Chain implements IHandler {
  protected nextHandler: IHandler
  protected operator: Operator
  abstract calculate(request: Numbers): number

  setNext(nextChain: IHandler): IHandler {
    return (this.nextHandler = nextChain)
  }

  handle(request: Numbers) {
    if (request.getCalcWanted() === this.operator) {
      return String(this.calculate(request))
    }
    if (this.nextHandler) return this.nextHandler.handle(request)

    return 'Not found'
  }
}

class Numbers {
  private number1: number
  private number2: number
  private calculationWanted: Operator

  constructor(newNumber1: number, newNumber2: number, calcWanted: Operator) {
    this.number1 = newNumber1
    this.number2 = newNumber2
    this.calculationWanted = calcWanted
  }

  public getNumber1(): number {
    return this.number1
  }

  public getNumber2(): number {
    return this.number2
  }

  public getCalcWanted(): Operator {
    return this.calculationWanted
  }
}

class AddNumbers extends Chain {
  operator: Operator = Operator.Add

  calculate(request: Numbers) {
    return request.getNumber1() + request.getNumber2()
  }
}

class SubtractNumbers extends Chain {
  operator: Operator = Operator.Subtract

  calculate(request: Numbers) {
    return request.getNumber1() - request.getNumber2()
  }
}

class MultNumbers extends Chain {
  operator: Operator = Operator.Mult

  calculate(request: Numbers) {
    return request.getNumber1() * request.getNumber2()
  }
}

class DivideNumbers extends Chain {
  operator: Operator = Operator.Divide

  calculate(request: Numbers) {
    return request.getNumber1() / request.getNumber2()
  }
}

class ChaiOfResponsibilityExample {
  addChain1: Chain = new AddNumbers()
  subtractChain: Chain = new SubtractNumbers()
  multChain: Chain = new MultNumbers()
  divideChain: Chain = new DivideNumbers()

  constructor() {
    this.configurate()
    this.run(new Numbers(10, 3, Operator.Add))
    this.run(new Numbers(10, 3, Operator.Subtract))
    this.run(new Numbers(10, 3, Operator.Mult))
    this.run(new Numbers(10, 3, Operator.Divide))
  }

  private configurate() {
    this.addChain1.setNext(this.subtractChain).setNext(this.multChain).setNext(this.divideChain)
  }

  private run(request: Numbers) {
    console.log(this.addChain1.handle(request))
  }
}

new ChaiOfResponsibilityExample()
