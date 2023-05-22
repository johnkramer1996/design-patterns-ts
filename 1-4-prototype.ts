export interface Prototype {
  clone(): Prototype
}

export class Rectangle implements Prototype {
  width: number
  heigth: number

  constructor() {}

  clone(): Rectangle {
    return Object.assign(new Rectangle(), this)
  }
}
let rectangle1 = new Rectangle()

rectangle1.heigth = 10
rectangle1.width = 20

let rectangle2 = rectangle1.clone()

console.log(rectangle1)
console.log(rectangle2)
