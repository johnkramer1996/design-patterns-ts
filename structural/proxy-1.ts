interface MoneyTransfer {
  transfer(amount: number, debitor: BankAccount, creditor: BankAccount): boolean
}

class BankAccount {
  private credit: number
  private name: string

  constructor(_credit: number, _name: string) {
    this.credit = _credit
    this.name = _name
  }

  withdraw(amount: number): void {
    if (amount > 0) this.credit -= amount
  }

  deposit(amount: number): void {
    if (amount > 0) this.credit += amount
  }

  getBalance(): number {
    return this.credit
  }

  toString(): string {
    return `${this.name} balance: ${this.getBalance()}`
  }
}

class WireTransfer implements MoneyTransfer {
  transfer(amount: number, debitor: BankAccount, creditor: BankAccount): boolean {
    if (amount < 0) return false
    debitor.withdraw(amount)
    creditor.deposit(amount)
    return true
  }
}

class WireTransferProxy implements MoneyTransfer {
  private unsafeTransfer: WireTransfer

  transfer(amount: number, debitor: BankAccount, creditor: BankAccount): boolean {
    return creditor.getBalance() > amount
      ? this.unsafeTransfer.transfer(amount, debitor, creditor)
      : false
  }
}

class ProxyExample {
  transfer: MoneyTransfer

  constructor() {
    console.log('--- Without Proxy ---')
    this.transfer = new WireTransfer()
    this.run()
    console.log('--- With Proxy ---')
    this.transfer = new WireTransferProxy()
    this.run()
  }

  run(): void {
    const creditor = new BankAccount(500, 'Creditor')
    const debitor = new BankAccount(500, 'Debitor')

    console.log(String(creditor))
    console.log(String(debitor))
    this.transfer.transfer(1000, debitor, creditor)
    console.log(String(creditor))
    console.log(String(debitor))
  }
}

new ProxyExample()
