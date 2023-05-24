class Account {
  constructor(private _name: string, private _money: number) {}

  info() {
    console.log(this._money)
  }

  get money() {
    return this._money
  }

  set money(value) {
    this._money = value
  }
}

abstract class Operation {
  public IsComplete: boolean = false

  constructor(protected account: Account, protected money: number) {}

  execute() {}
}

class Deposit extends Operation {
  execute() {
    this.account.money += this.money
    this.IsComplete = true
  }
}

class Withdraw extends Operation {
  execute() {
    if (this.account.money - this.money < 0) return
    this.account.money -= this.money
    this.IsComplete = true
  }
}

class OperationManager {
  static instanse = new OperationManager()
  private transactions: Operation[] = new Array()

  AddOperation(operation: Operation) {
    this.transactions.push(operation)
  }

  ProcessOperations(): void {
    let completed = 0
    this.transactions.forEach((el) => (!el.IsComplete ? el.execute() : ''))
    if (completed) this.ProcessOperations()
  }
}

const account1: Account = new Account('user1', 0)
const account2: Account = new Account('user2', 0)
const account3: Account = new Account('user3', 0)

account1.info()
account2.info()
account3.info()

var manager = OperationManager.instanse

manager.AddOperation(new Deposit(account3, 1000))
manager.AddOperation(new Deposit(account2, 2000))
manager.AddOperation(new Deposit(account3, 3000))

manager.ProcessOperations()
account1.info()
account2.info()
account3.info()

manager.AddOperation(new Withdraw(account1, 1000))
manager.AddOperation(new Withdraw(account2, 2000))
manager.AddOperation(new Withdraw(account3, 3000))

manager.ProcessOperations()
account1.info()
account2.info()
account3.info()

manager.AddOperation(new Deposit(account1, 2000))

manager.ProcessOperations()
account1.info()
account2.info()
account3.info()
