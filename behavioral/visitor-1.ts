interface IVisitor {
  visit(part: Part, level: number): void
}

interface IVisitable {
  accept(visitor: IVisitor): void
}

class Part implements IVisitable {
  name: string
  value: number
  parts: Set<Part>

  constructor(name: string, value: number, parent?: Part) {
    this.name = name
    this.value = value
    this.parts = new Set()
    parent?.parts.add(this)
  }

  accept(visitor: IVisitor, level: number = 0) {
    visitor.visit(this, level)
    this.parts.forEach((part) => part.accept(visitor, level + 1))
  }
}

class PrintNamesVisitor implements IVisitor {
  str = ''
  visit(part: Part, level: number) {
    this.str += '\n' + part.name.padStart(level * 5)
  }
}

class CalculateTotalVisitor implements IVisitor {
  totalValue = 0

  visit(part: Part, level: number) {
    this.totalValue += part.value
  }
}

class VisitorExample {
  nodeA = new Part('A', 101)
  nodeB = new Part('B', 305, this.nodeA)
  nodeC = new Part('C', 185, this.nodeA)
  nodeD = new Part('D', -30, this.nodeB)

  constructor() {
    this.run()
  }

  run() {
    const printNamesVisitor = new PrintNamesVisitor()
    this.nodeA.accept(printNamesVisitor)
    console.log(printNamesVisitor.str)

    const calculateTotalVisitor = new CalculateTotalVisitor()
    this.nodeA.accept(calculateTotalVisitor)

    console.log(calculateTotalVisitor.totalValue)
  }
}

new VisitorExample()
