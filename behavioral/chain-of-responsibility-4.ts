interface SaleHandler {
  setNext(handler: SaleHandler): SaleHandler
  handle(amount: number): void
}

abstract class AbstractSaleHandler implements SaleHandler {
  private nextHandler!: SaleHandler

  setNext(handler: SaleHandler): SaleHandler {
    return (this.nextHandler = handler)
  }

  handle(amount: number): void {
    if (this.nextHandler) this.nextHandler.handle(amount)
  }
}

class Salesman extends AbstractSaleHandler {
  handle(amount: number): void {
    if (amount < 1000) console.log(`${amount}$: A Salesman will handle this order`)
    else super.handle(amount)
  }
}

class SalesLeader extends AbstractSaleHandler {
  handle(amount: number): void {
    if (amount < 10000) console.log(`${amount}$: A Sales Leader will handle this order`)
    else super.handle(amount)
  }
}

class SalesManager extends AbstractSaleHandler {
  handle(amount: number): void {
    if (amount < 50000) console.log(`${amount}$: A Sales Manager will handle this order`)
    else super.handle(amount)
  }
}

class SalesOfficer extends AbstractSaleHandler {
  handle(amount: number): void {
    console.log(`${amount}$: A Sales Officer will handle this order`)
  }
}

class ChaiOfResponsibilityExample {
  salesDept: SaleHandler

  constructor() {
    this.salesDept = this.configure()
    this.run()
  }

  configure(): SaleHandler {
    const salesman = new Salesman()
    const leader = new SalesLeader()
    const manager = new SalesManager()
    const officer = new SalesOfficer()

    salesman.setNext(leader).setNext(manager).setNext(officer)

    return salesman
  }

  run(): void {
    this.salesDept.handle(500)
    this.salesDept.handle(5000)
    this.salesDept.handle(20000)
    this.salesDept.handle(500000)
  }
}

new ChaiOfResponsibilityExample()
