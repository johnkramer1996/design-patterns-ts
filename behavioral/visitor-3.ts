interface Shape {
  accept(visitor: ShapeVisitor): void
}

class Circle implements Shape {
  radius: number

  constructor(_radius: number) {
    this.radius = _radius
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this)
  }
}

class Rectangle implements Shape {
  height: number
  length: number

  constructor(_height: number, _length: number) {
    this.height = _height
    this.length = _length
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this)
  }
}

interface ShapeVisitor {
  visitCircle(shape: Circle): void
  visitRectangle(shape: Rectangle): void
}

class ShapeAnalyzer implements ShapeVisitor {
  visitCircle(shape: Circle): void {
    let area = Math.PI * Math.pow(shape.radius, 2)
    let circumference = 2 * Math.PI * shape.radius

    console.log(`Circle: r = ${shape.radius}, C = ${circumference}, A = ${area}`)
  }

  visitRectangle(shape: Rectangle): void {
    let area = shape.height * shape.length
    let perimeter = shape.height * 2 + shape.length * 2

    console.log(
      `Rectangle: b = ${shape.length}, h = ${shape.height}, 2P = ${perimeter}, A = ${area}`,
    )
  }
}

class VisitorExample {
  analyzer: ShapeAnalyzer

  constructor() {
    this.analyzer = new ShapeAnalyzer()

    this.run()
  }

  run(): void {
    const rectangle = new Rectangle(5, 10)
    const circle = new Circle(8)

    rectangle.accept(this.analyzer)
    circle.accept(this.analyzer)
  }
}

new VisitorExample()
