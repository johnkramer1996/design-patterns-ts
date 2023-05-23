interface ArmyRank {
  executeOrder(): void
}

class Soldier implements ArmyRank {
  rank: string
  name: string

  constructor(_rank: string, _name: string) {
    this.rank = _rank
    this.name = _name
  }

  executeOrder(): void {
    console.log(`${this.rank} ${this.name} executed order`)
  }
}

class Division implements ArmyRank {
  name: string
  private children: ArmyRank[] = []

  constructor(_name: string) {
    this.name = _name
  }

  add(child: ArmyRank): void {
    this.children.push(child)
  }

  remove(child: ArmyRank): void {
    this.children = this.children.filter((_child) => child === _child)
  }

  executeOrder(): void {
    this.children.forEach((child: ArmyRank) => child.executeOrder())
  }
}

class CompositeExample {
  constructor() {
    this.run()
  }

  run() {
    const army = new Division('Army')
    const paratroopers = new Division('Paratroopers')
    const infantry = new Division('Infantry')
    army.add(new Soldier('General', 'Patton'))

    paratroopers.add(new Soldier('Private', 'Brown'))
    paratroopers.add(new Soldier('Sergeant', 'Davis'))
    paratroopers.add(new Soldier('Private', 'Miller'))

    infantry.add(new Soldier('Private', 'Jones'))
    infantry.add(new Soldier('Sergeant', 'Smith'))

    army.add(new Soldier('Private', 'Williams'))

    army.add(infantry)
    army.add(paratroopers)

    army.executeOrder()
  }
}

new CompositeExample()
